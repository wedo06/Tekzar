import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/hero_farmer.png';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      el.style.animation = 'none';
      requestAnimationFrame(() => {
        el.style.animation = 'fadeInUp 0.9s ease forwards';
      });
    }
  }, []);

  const handleScroll = () => {
    const el = document.getElementById('categories');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home" ref={heroRef} aria-label="Hero section">
      {/* Background */}
      <div className="hero-bg">
        <img
          src={heroImage}
          alt="Farmer using TEKZAR brush cutter in golden field"
          className="hero-img"
          loading="eager"
          fetchpriority="high"
        />
        <div className="hero-overlay" />
        <div className="hero-gradient-left" />
        <div className="hero-particles" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container hero-container">
        <div className="hero-content" ref={textRef}>
          {/* Tag */}
          <div className="hero-tag">
            <span className="hero-tag-dot" aria-hidden="true" />
            <span>POWERING KERALA & TAMIL NADU AGRICULTURE</span>
          </div>

          {/* Headline */}
          <h1 className="hero-title">
            <span className="hero-title-line">Built for</span>
            <span className="hero-title-accent">Tough Fields.</span>
            <span className="hero-title-line">Priced for</span>
            <span className="hero-title-accent-green">Every Farmer.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Reliable, powerful & affordable equipment for every stage of farming.
            From brush cutters to generators — we've got you covered.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleScroll}
              aria-label="Explore TEKZAR products"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              Explore Products
            </button>
            <Link
              to="/dealers"
              className="btn btn-secondary btn-lg"
            >
              Become a Dealer
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="hero-trust">
            <div className="trust-badge">
              <span className="trust-icon"></span>
              <span>Trusted by 1L+ Farmers</span>
            </div>
            <div className="trust-divider" aria-hidden="true" />
            <div className="trust-badge">
              <span className="trust-icon"></span>
              <span>200+ Dealers</span>
            </div>
            <div className="trust-divider" aria-hidden="true" />
            <div className="trust-badge">
              <span className="trust-icon"></span>
              <span>Warranty on All Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        className="hero-scroll"
        onClick={handleScroll}
        aria-label="Scroll to products"
      >
        <div className="scroll-ball" aria-hidden="true" />
      </button>
    </section>
  );
};

export default Hero;
