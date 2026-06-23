import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const Navbar = ({ onContactClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [productsOpen, setProductsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMenuOpen(false);
    setActiveSection(id);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'categories', label: 'Products', hasDropdown: true },
    { id: 'dealers', label: 'Dealers' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const productCategories = [
    'Brush Cutters', 'Power Weeders', 'Chainsaws',
    'Battery Sprayers', 'Chaff Cutters', 'Portable Generators',
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav-container">
          {/* Logo */}
          <a className="nav-logo" href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} aria-label="TEKZAR Home">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <polygon points="20,2 38,32 2,32" fill="none" stroke="#FF6B00" strokeWidth="3"/>
                <polygon points="20,10 32,30 8,30" fill="#FF6B00" opacity="0.3"/>
                <line x1="20" y1="2" x2="20" y2="32" stroke="#FF6B00" strokeWidth="2"/>
              </svg>
            </div>
            <div className="logo-text">
              <span className="logo-brand">TEKZAR</span>
              <span className="logo-tagline">Excellence Made Affordable</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="nav-links" role="list">
            {navLinks.map((link) => (
              <li key={link.id} className={link.hasDropdown ? 'has-dropdown' : ''} ref={link.hasDropdown ? dropdownRef : null}>
                <button
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={() => {
                    if (link.hasDropdown) setProductsOpen(!productsOpen);
                    else scrollTo(link.id);
                  }}
                  aria-expanded={link.hasDropdown ? productsOpen : undefined}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <svg className={`chevron ${productsOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                </button>
                {link.hasDropdown && productsOpen && (
                  <div className="dropdown" role="menu">
                    {productCategories.map((cat) => (
                      <button
                        key={cat}
                        className="dropdown-item"
                        role="menuitem"
                        onClick={() => { scrollTo('categories'); setProductsOpen(false); }}
                      >
                        <span className="dropdown-dot" />
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="nav-actions">
            <a
              href="tel:+917200949459"
              className="nav-phone"
              aria-label="Call TEKZAR at +91 72009 49459"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              +91 72009 49459
            </a>
            <a
              href="https://wa.me/917200949459?text=Hi, I'm interested in TEKZAR products"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm nav-whatsapp"
              aria-label="Chat on WhatsApp"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} role="dialog" aria-label="Mobile navigation">
        <div className="mobile-menu-header">
          <div className="logo-text">
            <span className="logo-brand">TEKZAR</span>
            <span className="logo-tagline">Excellence Made Affordable</span>
          </div>
          <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
        </div>

        <ul className="mobile-links" role="list">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button className="mobile-link" onClick={() => scrollTo(link.id)}>
                {link.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <div className="mobile-cta">
          <a href="tel:+917200949459" className="btn btn-secondary">
            📞 Call Us Now
          </a>
          <a
            href="https://wa.me/917200949459?text=Hi, I'm interested in TEKZAR products"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>

      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} aria-hidden="true" />}
    </>
  );
};

export default Navbar;
