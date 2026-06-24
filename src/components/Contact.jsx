import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Phone, Mail, Globe, MapPin, CheckCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `*TEKZAR Enquiry*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email}%0A*Product Interest:* ${formData.product}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/917200949459?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      label: 'Phone / WhatsApp',
      value: '+91 72009 49459',
      link: 'tel:+917200949459',
    },
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'info@shalomgreentech.in',
      link: 'mailto:info@shalomgreentech.in',
    },
    {
      icon: <MapPin size={24} />,
      label: 'Location',
      value: '125, Industrial Area, Coimbatore, Tamil Nadu, India',
      link: null,
    },
  ];

  const products = [
    'Brush Cutters', 'Power Weeders', 'Chainsaws',
    'Battery Sprayers', 'Chaff Cutters', 'Portable Generators', 'Spare Parts',
  ];

  return (
    <section className="section contact-section" id="contact" ref={sectionRef} aria-labelledby="contact-title">
      <div className="contact-bg" aria-hidden="true">
        <div className="contact-orb-1" />
        <div className="contact-orb-2" />
      </div>

      <div className="container">
        <div className="contact-header fade-in">
          <div className="section-tag"><MessageSquare size={18} /> Get In Touch</div>
          <h2 className="section-title" id="contact-title">
            Let's Talk <span>Agriculture.</span>
          </h2>
          <p className="section-subtitle">
            Have a question, need a quote, or want to know more? Our team is ready to help you find the right equipment.
          </p>
        </div>

        <div className="contact-layout">
          {/* Left: Info */}
          <div className="contact-info fade-in">
            {contactInfo.map((info, i) => (
              <div key={i} className="contact-card">
                <div className="contact-icon" aria-hidden="true">{info.icon}</div>
                <div className="contact-detail">
                  <span className="contact-label">{info.label}</span>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="contact-value contact-link"
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="contact-value">{info.value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Social / WhatsApp CTA */}
            <div className="contact-social">
              <a
                href="https://wa.me/917200949459?text=Hi TEKZAR, I want to know more about your products"
                target="_blank"
                rel="noopener noreferrer"
                className="btn whatsapp-cta"
                aria-label="Chat with TEKZAR on WhatsApp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
              <a href="tel:+917200949459" className="btn btn-secondary" aria-label="Call TEKZAR">
                Call Now
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrap fade-in">
            <div className="contact-form-card">
              <h3 className="form-title">Send Us a Message</h3>
              <p className="form-subtitle">We'll reply within 24 hours</p>

              {submitted ? (
                <div className="form-success" role="alert" aria-live="polite">
                  <div className="success-icon"><CheckCircle size={48} color="#16A34A" /></div>
                  <h4>Message Sent!</h4>
                  <p>We'll get back to you on WhatsApp very soon.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row-two">
                    <div className="form-group">
                      <label htmlFor="contact-name" className="form-label">Your Name *</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        className="form-input"
                        placeholder="Full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact-phone" className="form-label">Phone Number *</label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        className="form-input"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">Email Address</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-product" className="form-label">Product Interest</label>
                    <select
                      id="contact-product"
                      name="product"
                      className="form-input form-select"
                      value={formData.product}
                      onChange={handleChange}
                    >
                      <option value="">Select a product category</option>
                      {products.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">Your Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="form-input form-textarea"
                      placeholder="Tell us what you're looking for..."
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg form-submit">
                    Send Message via WhatsApp
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
