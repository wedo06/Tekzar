import React, { useEffect, useRef } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../firebase/config';
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
          src={product.imageUrl}
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
        </div>
      </div>
    </article>
  );
};

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), limit(6));
        const querySnapshot = await getDocs(q);
        const prods = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeaturedProducts(prods);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
              const el = document.getElementById('categories');
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 70;
                window.scrollTo({ top, behavior: 'smooth' });
              }
            }}
          >
            View All Products →
          </button>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0', color: 'var(--orange-primary)' }}>
            <Loader2 className="animate-spin" size={48} />
          </div>
        ) : (
          <div className="featured-grid" role="list">
            {featuredProducts.map((product, i) => (
              <div key={product.id} role="listitem">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
