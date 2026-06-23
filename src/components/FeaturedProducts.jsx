import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { featuredProducts } from '../data/products';
import './FeaturedProducts.css';

const ProductCard = ({ product, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) cardRef.current?.classList.add('visible');
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <article
      ref={cardRef}
      className="product-card fade-in"
      style={{ transitionDelay: `${index * 0.1}s` }}
      aria-label={`${product.name} - ${product.category}`}
    >
      {/* Tag */}
      <div className={`product-tag tag-${product.tagColor}`}>{product.tag}</div>

      {/* Image */}
      <div className="product-img-wrap">
        <img
          src={product.image}
          alt={`${product.name} - TEKZAR ${product.category}`}
          className="product-img"
          loading="lazy"
        />
        <div className="product-img-glow" aria-hidden="true" />
      </div>

      {/* Info */}
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>

        <ul className="product-specs">
          {product.specs.map((spec) => (
            <li key={spec} className="product-spec">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {spec}
            </li>
          ))}
        </ul>

        <div className="product-footer">
          <button
            className="btn btn-primary btn-sm"
            onClick={scrollToContact}
            aria-label={`Enquire about ${product.name}`}
          >
            Enquire Now
          </button>
          <button
            className="whatsapp-mini"
            onClick={() => window.open(`https://wa.me/917200949459?text=Hi, I'm interested in ${product.name}`, '_blank')}
            aria-label={`WhatsApp enquiry for ${product.name}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </button>
        </div>
      </div>
    </article>
  );
};

const FeaturedProducts = () => {
  return (
    <section className="section featured-section" id="products" aria-labelledby="featured-title">
      {/* Background */}
      <div className="featured-bg" aria-hidden="true">
        <div className="feat-orb feat-orb-1" />
      </div>

      <div className="container">
        <div className="featured-header fade-in">
          <div>
            <div className="section-tag"><Star size={18} /> Best Sellers</div>
            <h2 className="section-title" id="featured-title">
              Top Rated by <span>Farmers</span>
            </h2>
          </div>
          <button
            className="btn btn-outline-orange"
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 70;
                window.scrollTo({ top, behavior: 'smooth' });
              }
            }}
          >
            View All Products →
          </button>
        </div>

        <div className="featured-grid" role="list">
          {featuredProducts.map((product, i) => (
            <div key={product.id} role="listitem">
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
