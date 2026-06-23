import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories } from '../data/products';
import './CategoryDetail.css';

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const found = categories.find((c) => c.id === id);
    setCategory(found);
    window.scrollTo(0, 0);
  }, [id]);

  if (!category) {
    return (
      <div className="container" style={{ padding: '120px 0', textAlign: 'center' }}>
        <h2>Category Not Found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="category-hero" style={{ backgroundImage: `url(${category.image})` }}>
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
          {category.subCategories.map((sub, i) => (
            <div key={i} className="sub-cat-card">
              {sub.image && (
                <img src={sub.image} alt={sub.name} className="sub-cat-img" />
              )}
              <h3>{sub.name}</h3>
              <p>High quality {sub.name.toLowerCase()} designed for maximum efficiency and durability in Indian agricultural conditions.</p>
              <a 
                href={`https://wa.me/917200949459?text=Hi, I am interested in ${category.name} - ${sub.name}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline-orange btn-sm"
              >
                Enquire Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
