import React, { useRef, useEffect } from 'react';
import { testimonials } from '../data/products';
import './Testimonials.css';

const StarRating = ({ rating }) => (
  <div className="star-rating" aria-label={`${rating} out of 5 stars`}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < rating ? '#FF6B00' : 'none'} stroke="#FF6B00" strokeWidth="1.5" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const items = sectionRef.current?.querySelectorAll('.fade-in');
    items?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section testimonials-section" id="testimonials" ref={sectionRef} aria-labelledby="testimonials-title">
      <div className="testimonials-bg" aria-hidden="true">
        <div className="test-orb test-orb-1" />
        <div className="test-orb test-orb-2" />
      </div>

      <div className="container">
        <div className="testimonials-header fade-in">
          <div className="section-tag"><span>💬</span> What Farmers Say</div>
          <h2 className="section-title" id="testimonials-title">
            Real Stories from <span>Real Farmers</span>
          </h2>
          <p className="section-subtitle">
            Don't just take our word for it — hear from the farmers and dealers who rely on TEKZAR every day.
          </p>
        </div>

        <div className="testimonials-grid" role="list">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="testimonial-card fade-in"
              style={{ transitionDelay: `${i * 0.1}s` }}
              role="listitem"
            >
              {/* Quote Icon */}
              <div className="quote-icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
                </svg>
              </div>

              <StarRating rating={t.rating} />

              <blockquote className="testimonial-text">"{t.text}"</blockquote>

              <div className="testimonial-author">
                <div className="author-avatar" aria-hidden="true">
                  {t.initials}
                </div>
                <div className="author-info">
                  <cite className="author-name">{t.name}</cite>
                  <span className="author-role">{t.role}, {t.location}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
