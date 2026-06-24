import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Loader2 } from 'lucide-react';
import './CategoryDetail.css';

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setCategory(null);

    // Try direct document lookup first (works if ID is slug like 'brush-cutters')
    const docRef = doc(db, 'categories', id);
    const unsub = onSnapshot(docRef, async (docSnap) => {
      if (docSnap.exists()) {
        setCategory({ id: docSnap.id, ...docSnap.data() });
        setLoading(false);
      } else {
        // Fallback: query by stored 'id' field (for old random-ID documents)
        try {
          const q = query(collection(db, 'categories'), where('id', '==', id));
          const snap = await getDocs(q);
          if (!snap.empty) {
            const d = snap.docs[0];
            setCategory({ id: d.id, ...d.data() });
          } else {
            setCategory(null);
          }
        } catch (err) {
          console.error(err);
          setCategory(null);
        }
        setLoading(false);
      }
    }, (err) => {
      console.error(err);
      setCategory(null);
      setLoading(false);
    });

    return () => unsub();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '120px 0', textAlign: 'center', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" size={48} color="var(--orange-primary)" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container" style={{ padding: '120px 0', textAlign: 'center', minHeight: '50vh' }}>
        <h2>Category Not Found</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 12 }}>
          This category may not exist yet. Please check back later.
        </p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '24px', display: 'inline-block' }}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="category-page">
      {/* Hero */}
      <div
        className="category-hero"
        style={{
          backgroundImage: category.imageUrl ? `url(${category.imageUrl})` : 'none',
          backgroundColor: category.color || '#111',
        }}
      >
        <div className="category-hero-overlay" />
        <div className="container">
          <div className="category-hero-content fade-in visible">
            <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', textDecoration: 'none', marginBottom: 16, display: 'inline-block' }}>
              ← Back to Home
            </Link>
            <h1>{category.name}</h1>
            <p>{category.description}</p>
          </div>
        </div>
      </div>

      {/* Sub-categories */}
      <div className="container category-content">
        <h2 className="section-title">
          Explore <span>Sub Categories</span>
        </h2>

        {(!category.subCategories || category.subCategories.length === 0) ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.4)' }}>
            <p>No sub-categories available yet.</p>
          </div>
        ) : (
          <div className="sub-categories-grid fade-in visible">
            {category.subCategories.map((sub, i) => {
              const subName = typeof sub === 'string' ? sub : sub.name;
              const subImg = typeof sub === 'string' ? null : (sub.imageUrl || null);

              return (
                <div key={i} className="sub-cat-card">
                  {subImg ? (
                    <div style={{ width: '100%', height: 200, marginBottom: 16, borderRadius: 8, overflow: 'hidden' }}>
                      <img src={subImg} alt={subName} className="sub-cat-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ) : (
                    <div style={{
                      width: '100%', height: 160, marginBottom: 16, borderRadius: 8,
                      background: `linear-gradient(135deg, ${category.color || '#FF6B00'}22, ${category.color || '#FF6B00'}44)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `1px solid ${category.color || '#FF6B00'}33`,
                    }}>
                      <span style={{ fontSize: '3rem' }}>🌾</span>
                    </div>
                  )}
                  <h3>{subName}</h3>
                  <p>
                    High quality {subName.toLowerCase()} designed for maximum efficiency and durability in Indian agricultural conditions.
                  </p>
                  <a
                    href={`https://wa.me/917200949459?text=Hi, I am interested in ${encodeURIComponent(category.name + ' - ' + subName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-orange btn-sm"
                  >
                    Enquire on WhatsApp →
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;
