import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { categories } from '../data/products';
import logoImg from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleNavClick = (path, hash) => {
    setMenuOpen(false);
    if (path) {
      navigate(path);
    } else if (hash) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 100);
      } else {
        const el = document.getElementById(hash);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', hash: 'categories', hasDropdown: true },
    { label: 'Dealers', path: '/dealers' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav-container">
          {/* Logo */}
          <Link className="nav-logo" to="/" onClick={() => setMenuOpen(false)} aria-label="TEKZAR Home">
            <img src={logoImg} alt="TEKZAR Logo" className="logo-image" />
          </Link>

          {/* Desktop Nav */}
          <ul className="nav-links" role="list">
            {navLinks.map((link) => {
              const isActive = link.path ? location.pathname === link.path : false;
              return (
                <li key={link.label} className={link.hasDropdown ? 'has-dropdown' : ''} ref={link.hasDropdown ? dropdownRef : null}>
                  <button
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      if (link.hasDropdown) setProductsOpen(!productsOpen);
                      else handleNavClick(link.path, link.hash);
                    }}
                    aria-expanded={link.hasDropdown ? productsOpen : undefined}
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDown className={`chevron ${productsOpen ? 'open' : ''}`} size={14} />
                    )}
                  </button>
                  {link.hasDropdown && productsOpen && (
                    <div className="dropdown" role="menu">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          className="dropdown-item"
                          role="menuitem"
                          onClick={() => { 
                            handleNavClick(`/category/${cat.id}`); 
                            setProductsOpen(false); 
                          }}
                        >
                          <span className="dropdown-dot" />
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* CTA Removed */}

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
          <img src={logoImg} alt="TEKZAR Logo" className="logo-image-mobile" />
          <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={24} /></button>
        </div>

        <ul className="mobile-links" role="list">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button className="mobile-link" onClick={() => handleNavClick(link.path, link.hash)}>
                {link.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile CTA Removed */}
      </div>

      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} aria-hidden="true" />}
    </>
  );
};

export default Navbar;
