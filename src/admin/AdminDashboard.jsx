// src/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../firebase/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot, setDoc
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import { categories as defaultCategories, featuredProducts } from '../data/products';
import logoImg from '../assets/logo.png';
import './Admin.css';

// ── Icons (inline SVG to avoid extra imports) ──
const Icon = ({ path, size = 20, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d={path} />
  </svg>
);

const ICONS = {
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  box: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
  tag: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01',
  plus: 'M12 5v14M5 12h14',
  edit: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
  trash: 'M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
};

// ── Image Upload Component ──
const ImageUpload = ({ value, onChange, folder, placeholder = "+ Upload Image" }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    setProgress(0);
    
    const fileRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);
    
    uploadTask.on('state_changed', 
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
      },
      (error) => {
        alert("Upload failed: " + error.message);
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        onChange(url);
        setUploading(false);
      }
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {value ? (
        <div style={{ position: 'relative', width: 80, height: 80, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' }}>
          <img src={value} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button 
            type="button" 
            onClick={() => onChange('')}
            style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}
          >✕</button>
        </div>
      ) : (
        <label style={{ display: 'inline-block', padding: '10px 16px', background: 'rgba(255,107,0,0.1)', color: '#FF8C42', borderRadius: 8, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center', border: '1px dashed rgba(255,107,0,0.4)', width: 'fit-content' }}>
          {uploading ? `Uploading... ${progress}%` : placeholder}
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} style={{ display: 'none' }} />
        </label>
      )}
    </div>
  );
};

// ── Category Form Modal ──
const CategoryModal = ({ category, onClose, onSave }) => {
  const [form, setForm] = useState(
    category || { name: '', description: '', color: '#FF6B00', imageUrl: '', subCategories: [{ name: '', imageUrl: '' }] }
  );
  const [saving, setSaving] = useState(false);

  // Migration for old string-based subcategories
  useEffect(() => {
    if (category && category.subCategories && typeof category.subCategories[0] === 'string') {
      setForm(prev => ({
        ...prev,
        subCategories: category.subCategories.map(s => ({ name: s, imageUrl: '' }))
      }));
    }
  }, [category]);

  const handleChange = (field, val) => setForm(prev => ({ ...prev, [field]: val }));

  const handleSubCatChange = (i, field, val) => {
    const subs = [...form.subCategories];
    subs[i] = { ...subs[i], [field]: val };
    setForm(prev => ({ ...prev, subCategories: subs }));
  };

  const addSubCat = () => setForm(prev => ({ ...prev, subCategories: [...prev.subCategories, { name: '', imageUrl: '' }] }));
  const removeSubCat = (i) => setForm(prev => ({
    ...prev,
    subCategories: prev.subCategories.filter((_, idx) => idx !== i)
  }));

  const handleSave = async () => {
    if (!form.name.trim()) return alert('Category name is required.');
    setSaving(true);
    const cleanSubs = form.subCategories.filter(s => s.name.trim());
    await onSave({ ...form, subCategories: cleanSubs });
    setSaving(false);
    onClose();
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={e => e.stopPropagation()}>
        <h3 className="admin-modal-title">{category ? 'Edit Category' : 'Add New Category'}</h3>
        <div className="admin-modal-form">
          <div className="admin-modal-grid">
            <div className="admin-form-group">
              <label className="admin-label">Category Name *</label>
              <input className="admin-input" value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="e.g. Brush Cutters" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Accent Color</label>
              <input type="color" className="admin-input" value={form.color || '#FF6B00'} onChange={e => handleChange('color', e.target.value)} style={{ height: '48px', padding: '4px' }} />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Category Image</label>
            <ImageUpload value={form.imageUrl} onChange={(url) => handleChange('imageUrl', url)} folder="categories" placeholder="Upload Category Image" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Description</label>
            <textarea className="admin-input admin-textarea" value={form.description} onChange={e => handleChange('description', e.target.value)} placeholder="Short description" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Sub-Categories</label>
            <div className="admin-subcats-wrap" style={{ gap: '16px' }}>
              {form.subCategories.map((sub, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: 16, borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <input
                      className="admin-input"
                      value={sub.name}
                      onChange={e => handleSubCatChange(i, 'name', e.target.value)}
                      placeholder={`Sub-category ${i + 1} Name`}
                    />
                    <ImageUpload value={sub.imageUrl} onChange={(url) => handleSubCatChange(i, 'imageUrl', url)} folder="subcategories" placeholder="Upload Sub-Category Image" />
                  </div>
                  {form.subCategories.length > 1 && (
                    <button className="admin-subcat-remove" onClick={() => removeSubCat(i)} title="Remove" style={{ padding: '10px 14px' }}>✕</button>
                  )}
                </div>
              ))}
              <button className="admin-subcat-add" onClick={addSubCat} style={{ padding: 16, fontSize: '0.9rem' }}>+ Add Sub-Category</button>
            </div>
          </div>
        </div>
        <div className="admin-modal-footer">
          <button className="admin-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="admin-save-btn" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : category ? 'Update Category' : 'Add Category'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Product Form Modal ──
const ProductModal = ({ product, categories, onClose, onSave }) => {
  const [form, setForm] = useState(
    product || { name: '', category: '', description: '', tag: 'New', specs: [''], imageUrl: '' }
  );
  const [saving, setSaving] = useState(false);

  const handleChange = (field, val) => setForm(prev => ({ ...prev, [field]: val }));
  const handleSpecChange = (i, val) => {
    const specs = [...(form.specs || [])];
    specs[i] = val;
    setForm(prev => ({ ...prev, specs }));
  };
  const addSpec = () => setForm(prev => ({ ...prev, specs: [...(prev.specs || []), ''] }));
  const removeSpec = (i) => setForm(prev => ({ ...prev, specs: prev.specs.filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    if (!form.name.trim() || !form.category) return alert('Name and category are required.');
    setSaving(true);
    const cleanSpecs = (form.specs || []).filter(s => s.trim());
    await onSave({ ...form, specs: cleanSpecs });
    setSaving(false);
    onClose();
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={e => e.stopPropagation()}>
        <h3 className="admin-modal-title">{product ? 'Edit Product' : 'Add New Product'}</h3>
        <div className="admin-modal-form">
          <div className="admin-modal-grid">
            <div className="admin-form-group">
              <label className="admin-label">Product Name *</label>
              <input className="admin-input" value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="e.g. BC-430 Brush Cutter" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Category *</label>
              <select className="admin-input admin-select" value={form.category} onChange={e => handleChange('category', e.target.value)}>
                <option value="">Select Category</option>
                {categories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Product Image</label>
            <ImageUpload value={form.imageUrl} onChange={(url) => handleChange('imageUrl', url)} folder="products" placeholder="Upload Product Image" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Description</label>
            <textarea className="admin-input admin-textarea" value={form.description} onChange={e => handleChange('description', e.target.value)} placeholder="Product description" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Tag / Badge</label>
            <select className="admin-input admin-select" value={form.tag} onChange={e => handleChange('tag', e.target.value)}>
              <option value="New">New</option>
              <option value="Best Seller">Best Seller</option>
              <option value="Popular">Popular</option>
              <option value="Top Rated">Top Rated</option>
              <option value="Sale">Sale</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Specifications</label>
            <div className="admin-subcats-wrap">
              {(form.specs || ['']).map((spec, i) => (
                <div className="admin-subcat-row" key={i}>
                  <input className="admin-input" value={spec} onChange={e => handleSpecChange(i, e.target.value)} placeholder={`Spec ${i + 1}: e.g. 52cc Engine`} />
                  {(form.specs || []).length > 1 && (
                    <button className="admin-subcat-remove" onClick={() => removeSpec(i)}>✕</button>
                  )}
                </div>
              ))}
              <button className="admin-subcat-add" onClick={addSpec}>+ Add Spec</button>
            </div>
          </div>
        </div>
        <div className="admin-modal-footer">
          <button className="admin-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="admin-save-btn" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main Dashboard ──
const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryModal, setCategoryModal] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  // Real-time listeners
  useEffect(() => {
    const unsubCats = onSnapshot(collection(db, 'categories'), (snap) => {
      setCategories(snap.docs.map(d => ({ ...d.data(), id: d.id })));
      setLoading(false);
    }, (error) => {
      console.error("Categories Error:", error);
      alert("Database Error (Categories): " + error.message + " - Did you update your Firestore Rules?");
      setLoading(false);
    });

    const unsubProds = onSnapshot(collection(db, 'products'), (snap) => {
      setProducts(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }, (error) => {
      console.error("Products Error:", error);
    });

    return () => { unsubCats(); unsubProds(); };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

  // Category CRUD
  const saveCategory = async (data) => {
    if (data.id) {
      const { id, ...rest } = data;
      await updateDoc(doc(db, 'categories', id), rest);
    } else {
      await addDoc(collection(db, 'categories'), data);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm('Delete this category? This cannot be undone.')) return;
    await deleteDoc(doc(db, 'categories', id));
  };

  // Product CRUD
  const saveProduct = async (data) => {
    if (data.id) {
      const { id, ...rest } = data;
      await updateDoc(doc(db, 'products', id), rest);
    } else {
      await addDoc(collection(db, 'products'), data);
    }
  };

  // Reset & Re-import: delete all old docs then re-import with correct slug IDs
  const resetAndImport = async () => {
    if (!window.confirm("⚠️ This will DELETE all existing categories/products and re-import defaults. Are you sure?")) return;
    setLoading(true);
    try {
      // Delete existing
      const catSnap = await getDocs(collection(db, 'categories'));
      for (const d of catSnap.docs) await deleteDoc(d.ref);
      const prodSnap = await getDocs(collection(db, 'products'));
      for (const d of prodSnap.docs) await deleteDoc(d.ref);

      // Re-import with setDoc so IDs are slug-based
      for (const cat of defaultCategories) {
        const { id, icon, image, count, subCategories, ...rest } = cat;
        await setDoc(doc(db, 'categories', id), {
          ...rest,
          imageUrl: image || '',
          subCategories: subCategories ? subCategories.map(s => ({ name: s.name || s, imageUrl: s.image || '' })) : []
        });
      }
      for (const prod of featuredProducts) {
        const { id, image, price, ...rest } = prod;
        await setDoc(doc(db, 'products', id.toString()), {
          ...rest,
          imageUrl: image || '',
          category: prod.category || 'General'
        });
      }
      alert("✅ Reset & Re-import successful! Your website now shows fresh data.");
    } catch (e) {
      alert("Error: " + e.message);
    }
    setLoading(false);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product? This cannot be undone.')) return;
    await deleteDoc(doc(db, 'products', id));
  };

  const importDefaultData = async () => {
    if (!window.confirm("This will import the default data into Firebase. Proceed?")) return;
    setLoading(true);
    try {
      for (const cat of defaultCategories) {
        const { id, icon, image, count, subCategories, ...rest } = cat;
        await setDoc(doc(db, 'categories', id), { 
          ...rest, 
          imageUrl: image || '', 
          subCategories: subCategories ? subCategories.map(s => ({ name: s.name || s, imageUrl: s.image || '' })) : [] 
        });
      }
      for (const prod of featuredProducts) {
        const { id, image, price, ...rest } = prod;
        await setDoc(doc(db, 'products', id.toString()), { 
          ...rest, 
          imageUrl: image || '',
          category: prod.category || 'General'
        });
      }
      alert("✅ Import successful! Refreshing data...");
    } catch (e) {
      alert("Error importing: " + e.message);
    }
    setLoading(false);
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: ICONS.grid },
    { id: 'categories', label: 'Categories', icon: ICONS.tag },
    { id: 'products', label: 'Products', icon: ICONS.box },
  ];

  return (
    <div className="admin-root">
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <img src={logoImg} alt="TEKZAR" />
            <span className="admin-sidebar-title">Admin</span>
          </div>
          <nav className="admin-nav">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon path={item.icon} size={18} />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="admin-sidebar-footer">
            <button className="admin-logout-btn" onClick={handleLogout}>
              <Icon path={ICONS.logout} size={16} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="admin-main">
          <div className="admin-topbar">
            <h2>
              {navItems.find(n => n.id === activeTab)?.label || 'Dashboard'}
            </h2>
            <span className="admin-topbar-meta">Logged in as {user?.email}</span>
          </div>

          <div className="admin-content">
            {/* Overview */}
            {activeTab === 'overview' && (
              <div style={{ maxWidth: 800 }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: 16 }}>Welcome Admin!</h1>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', marginBottom: 40 }}>
                  Manage your website content easily. Any changes you make here will instantly update on the live website.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
                  <div 
                    onClick={() => setActiveTab('categories')}
                    style={{ background: '#161616', border: '1px solid rgba(255,107,0,0.2)', padding: 32, borderRadius: 20, cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                  >
                    <div style={{ width: 56, height: 56, background: 'rgba(255,107,0,0.1)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF6B00', marginBottom: 20 }}>
                      <Icon path={ICONS.tag} size={28} />
                    </div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: 8 }}>Manage Categories</h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Add or edit main categories and sub-categories.</p>
                    <div style={{ marginTop: 24, fontSize: '2rem', fontWeight: 900, color: '#fff' }}>{categories.length}</div>
                  </div>

                  <div 
                    onClick={() => setActiveTab('products')}
                    style={{ background: '#161616', border: '1px solid rgba(255,107,0,0.2)', padding: 32, borderRadius: 20, cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                  >
                    <div style={{ width: 56, height: 56, background: 'rgba(255,107,0,0.1)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF6B00', marginBottom: 20 }}>
                      <Icon path={ICONS.box} size={28} />
                    </div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: 8 }}>Manage Products</h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Add or edit individual products and details.</p>
                    <div style={{ marginTop: 24, fontSize: '2rem', fontWeight: 900, color: '#fff' }}>{products.length}</div>
                  </div>
                </div>

                {/* Always-visible action cards */}
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
                  <button
                    onClick={importDefaultData}
                    className="admin-save-btn"
                    style={{ background: 'linear-gradient(135deg, #4ADE80, #16A34A)', flex: 1, minWidth: 200 }}
                  >
                    <Icon path={ICONS.box} size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
                    Import Default Data
                  </button>
                  <button
                    onClick={resetAndImport}
                    className="admin-save-btn"
                    style={{ background: 'linear-gradient(135deg, #f87171, #dc2626)', flex: 1, minWidth: 200 }}
                  >
                    <Icon path={ICONS.trash} size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
                    Reset &amp; Re-import All
                  </button>
                </div>
              </div>
            )}

            {/* Categories */}
            {activeTab === 'categories' && (
              <>
                <div className="admin-section-header">
                  <span className="admin-section-title">Product Categories</span>
                  <button className="admin-add-btn" onClick={() => { setEditingCategory(null); setCategoryModal(true); }}>
                    <Icon path={ICONS.plus} size={16} /> Add Category
                  </button>
                </div>
                {loading ? (
                  <div className="admin-loading"><div className="admin-spinner" /> Loading...</div>
                ) : categories.length === 0 ? (
                  <div className="admin-empty">
                    <Icon path={ICONS.tag} size={48} />
                    <p>No categories yet. Add your first category!</p>
                  </div>
                ) : (
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Sub-Categories</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map(cat => (
                          <tr key={cat.id}>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                {cat.imageUrl ? (
                                  <img src={cat.imageUrl} alt={cat.name} style={{ width: 36, height: 36, borderRadius: 6, objectFit: 'cover' }} />
                                ) : (
                                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: cat.color || '#FF6B00', flexShrink: 0 }} />
                                )}
                                <strong style={{ color: '#fff' }}>{cat.name}</strong>
                              </div>
                            </td>
                            <td style={{ maxWidth: 200, color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>{cat.description}</td>
                            <td>
                              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                                {(cat.subCategories || []).slice(0, 3).map((s, i) => (
                                  <span key={i} className="admin-badge admin-badge-orange">{typeof s === 'string' ? s : s.name}</span>
                                ))}
                                {(cat.subCategories || []).length > 3 && (
                                  <span className="admin-badge admin-badge-green">+{cat.subCategories.length - 3}</span>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="admin-action-btns">
                                <button className="admin-edit-btn" onClick={() => { setEditingCategory(cat); setCategoryModal(true); }}>
                                  <Icon path={ICONS.edit} size={13} /> Edit
                                </button>
                                <button className="admin-delete-btn" onClick={() => deleteCategory(cat.id)}>
                                  <Icon path={ICONS.trash} size={13} /> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {/* Products */}
            {activeTab === 'products' && (
              <>
                <div className="admin-section-header">
                  <span className="admin-section-title">Products ({products.length})</span>
                  <button className="admin-add-btn" onClick={() => { setEditingProduct(null); setProductModal(true); }}>
                    <Icon path={ICONS.plus} size={16} /> Add Product
                  </button>
                </div>
                {loading ? (
                  <div className="admin-loading"><div className="admin-spinner" /> Loading...</div>
                ) : products.length === 0 ? (
                  <div className="admin-empty">
                    <Icon path={ICONS.box} size={48} />
                    <p>No products yet. Add your first product!</p>
                  </div>
                ) : (
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Tag</th>
                          <th>Specs</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(prod => (
                          <tr key={prod.id}>
                            <td>
                              {prod.imageUrl ? (
                                <img src={prod.imageUrl} alt={prod.name} className="admin-table-img" />
                              ) : (
                                <div className="admin-table-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem' }}>No img</div>
                              )}
                            </td>
                            <td><strong style={{ color: '#fff' }}>{prod.name}</strong></td>
                            <td><span className="admin-badge admin-badge-orange">{prod.category}</span></td>
                            <td><span className="admin-badge admin-badge-green">{prod.tag}</span></td>
                            <td style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>
                              {(prod.specs || []).slice(0, 2).join(' • ')}{(prod.specs || []).length > 2 ? '...' : ''}
                            </td>
                            <td>
                              <div className="admin-action-btns">
                                <button className="admin-edit-btn" onClick={() => { setEditingProduct(prod); setProductModal(true); }}>
                                  <Icon path={ICONS.edit} size={13} /> Edit
                                </button>
                                <button className="admin-delete-btn" onClick={() => deleteProduct(prod.id)}>
                                  <Icon path={ICONS.trash} size={13} /> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {categoryModal && (
        <CategoryModal
          category={editingCategory}
          onClose={() => setCategoryModal(false)}
          onSave={saveCategory}
        />
      )}
      {productModal && (
        <ProductModal
          product={editingProduct}
          categories={categories}
          onClose={() => setProductModal(false)}
          onSave={saveProduct}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
