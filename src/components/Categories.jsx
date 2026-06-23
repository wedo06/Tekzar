import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid } from 'lucide-react';
import { categories } from '../data/products';
import './Categories.css';

import { Link } from 'react-router-dom';

const CategoryCard = ({ cat, index }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current?.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className="category-card fade-in"
      style={{ animationDelay: `${index * 0.08}s`, transitionDelay: `${index * 0.08}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${cat.name} category with ${cat.count} products`}
    >
      {/* Image */}
      <div className="cat-img-wrap">
        {cat.image ? (
          <img
            src={cat.image}
            alt={`TEKZAR ${cat.name}`}
            className={`cat-img ${hovered ? 'zoomed' : ''}`}
            loading="lazy"
          />
        ) : (
          <div className="cat-img-placeholder">
            <span className="cat-placeholder-icon">{cat.icon}</span>
          </div>
        )}
        <div className="cat-img-overlay" style={{ '--cat-color': cat.color }} />
      </div>

      {/* Info */}
      <div className="cat-info">
        <div className="cat-header">
          <h2 className="cat-name">{cat.name}</h2>
          <div className="cat-arrow-btn" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
        <p className="cat-desc">{cat.description}</p>

        {/* Removed inline sub categories */}

        <Link
          to={`/category/${cat.id}`}
          className="btn btn-outline-orange btn-sm cat-btn"
          aria-label={`View sub categories of ${cat.name}`}
        >
          View Sub Categories →
        </Link>
      </div>
    </article>
  );
};

const Categories = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) headerRef.current?.classList.add('visible');
      },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section categories-section" id="categories" aria-labelledby="categories-title">
      {/* Background */}
      <div className="categories-bg" aria-hidden="true">
        <div className="cat-bg-orb cat-bg-orb-1" />
        <div className="cat-bg-orb cat-bg-orb-2" />
      </div>

      <div className="container">
        {/* Header */}
        <div className="categories-header fade-in" ref={headerRef}>
          <div className="section-tag"><LayoutGrid size={18} /> Explore our Categories</div>
          <h2 className="section-title" id="categories-title">
            Everything You Need,<br />
            <span>All in One Place.</span>
          </h2>
          <p className="section-subtitle">
            Explore our comprehensive range of agricultural and power equipment — built for Indian
            farmers and professionals across every field.
          </p>
        </div>

        {/* Grid */}
        <div className="categories-grid" role="list">
          {categories.map((cat, i) => (
            <div key={cat.id} role="listitem">
              <CategoryCard cat={cat} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
