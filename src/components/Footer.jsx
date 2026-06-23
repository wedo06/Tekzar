import React from 'react';
import './Footer.css';

const Footer = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const productLinks = [
    'Brush Cutters', 'Power Weeders', 'Chainsaws',
    'Battery Sprayers', 'Chaff Cutters', 'Portable Generators',
  ];

  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about' },
    { label: 'Dealers', id: 'dealers' },
    { label: 'Contact', id: 'contact' },
  ];

  const serviceLinks = [
    'Spare Parts', 'Service Support', 'Warranty', 'Customer Support',
  ];

  return (
    <footer className="footer" role="contentinfo">
      {/* Top Border Glow */}
      <div className="footer-top-glow" aria-hidden="true" />

      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <polygon points="20,2 38,32 2,32" fill="none" stroke="#FF6B00" strokeWidth="3"/>
                  <polygon points="20,10 32,30 8,30" fill="#FF6B00" opacity="0.3"/>
                  <line x1="20" y1="2" x2="20" y2="32" stroke="#FF6B00" strokeWidth="2"/>
                </svg>
                <span className="footer-brand-name">TEKZAR</span>
              </div>
              <p className="footer-desc">
                Leading importer and distributor of agricultural, gardening and power equipment in India.
                Excellence Made Affordable.
              </p>
              <div className="footer-contact-quick">
                <a href="tel:+917200949459" className="footer-contact-item" aria-label="Call TEKZAR">
                  📞 +91 72009 49459
                </a>
                <a href="mailto:info@shalomgreentech.in" className="footer-contact-item" aria-label="Email TEKZAR">
                  📧 info@shalomgreentech.in
                </a>
                <span className="footer-contact-item">
                  🌐 www.shalomgreentech.in
                </span>
              </div>
              <div className="footer-socials">
                <a
                  href="https://wa.me/917200949459"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn whatsapp-social"
                  aria-label="TEKZAR WhatsApp"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a href="mailto:info@shalomgreentech.in" className="social-btn" aria-label="Email TEKZAR">
                  📧
                </a>
                <a href="tel:+917200949459" className="social-btn" aria-label="Call TEKZAR">
                  📞
                </a>
              </div>
            </div>

            {/* Products */}
            <nav aria-label="Product categories">
              <h4 className="footer-heading">Products</h4>
              <ul className="footer-links">
                {productLinks.map((link) => (
                  <li key={link}>
                    <button
                      className="footer-link"
                      onClick={() => scrollTo('categories')}
                    >
                      <span className="footer-link-dot" aria-hidden="true" />
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Quick Links */}
            <nav aria-label="Quick links">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      className="footer-link"
                      onClick={() => scrollTo(link.id)}
                    >
                      <span className="footer-link-dot" aria-hidden="true" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Service */}
            <nav aria-label="Service links">
              <h4 className="footer-heading">Service</h4>
              <ul className="footer-links">
                {serviceLinks.map((link) => (
                  <li key={link}>
                    <button
                      className="footer-link"
                      onClick={() => scrollTo('contact')}
                    >
                      <span className="footer-link-dot" aria-hidden="true" />
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="footer-address">
                <h5 className="footer-sub-heading">Address</h5>
                <address>
                  125, Industrial Area,<br />
                  Coimbatore, Tamil Nadu,<br />
                  India
                </address>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p className="footer-copy">
              © {new Date().getFullYear()} Tekzar Equipments Pvt Ltd. All Rights Reserved.
            </p>
            <div className="footer-bottom-links">
              <button className="footer-policy-link" onClick={() => scrollTo('home')}>Privacy Policy</button>
              <span aria-hidden="true">·</span>
              <button className="footer-policy-link" onClick={() => scrollTo('home')}>Terms of Service</button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917200949459?text=Hi, I'm interested in TEKZAR products"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="Chat with TEKZAR on WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="wa-float-label">Chat</span>
      </a>
    </footer>
  );
};

export default Footer;
