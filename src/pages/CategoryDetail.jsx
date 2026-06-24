import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Loader2 } from 'lucide-react';
import './CategoryDetail.css';

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const docRef = doc(db, 'categories', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCategory({ id: docSnap.id, ...docSnap.data() });
        } else {
          setCategory(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
    window.scrollTo(0, 0);
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
        <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="category-hero" style={{ backgroundImage: `url(${category.imageUrl || ''})`, backgroundColor: '#111' }}>
        <div className="category-hero-overlay"></div>
        <div className="container">
          <div className="category-hero-content fade-in visible">
            <h1>{category.name}</h1>
            <p>{category.description}</p>
          </div>
        </div>
      </div>

      <div className="container category-content">
        <h2 className="section-title">Explore <span>Sub Categories</span></h2>
        <div className="sub-categories-grid fade-in visible">
          {(category.subCategories || []).map((sub, i) => {
            const subName = typeof sub === 'string' ? sub : sub.name;
            const subImg = typeof sub === 'string' ? null : sub.imageUrl;

            return (
              <div key={i} className="sub-cat-card">
                {subImg && (
                  <div style={{ width: '100%', height: 200, marginBottom: 16, borderRadius: 8, overflow: 'hidden' }}>
                    <img src={subImg} alt={subName} className="sub-cat-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <h3>{subName}</h3>
                <p>High quality {subName.toLowerCase()} designed for maximum efficiency and durability in Indian agricultural conditions.</p>
                <a 
                  href={`https://wa.me/917200949459?text=Hi, I am interested in ${category.name} - ${subName}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline-orange btn-sm"
                >
                  Enquire Now
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
