import React, { useState, useRef, useEffect } from 'react';
import { TrendingUp, Banknote, Truck, Megaphone, Wrench, CheckCircle } from 'lucide-react';
import './DealerSection.css';

const DealerSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    state: '',
    city: '',
    mobile: '',
    email: '',
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
    // WhatsApp integration
    const msg = `*TEKZAR Dealer Registration*%0A%0A*Name:* ${formData.fullName}%0A*Business:* ${formData.businessName}%0A*State:* ${formData.state}%0A*City:* ${formData.city}%0A*Mobile:* ${formData.mobile}%0A*Email:* ${formData.email}`;
    window.open(`https://wa.me/917200949459?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  const states = [
    'Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab',
    'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal',
  ];

  const perks = [
    { icon: <Banknote size={24} />, text: 'Attractive Dealer Margins' },
    { icon: <Truck size={24} />, text: 'Timely Deliveries' },
    { icon: <Megaphone size={24} />, text: 'Marketing Support' },
    { icon: <Wrench size={24} />, text: 'After Sales Support' },
  ];

  return (
    <section className="section dealer-section" id="dealers" ref={sectionRef} aria-labelledby="dealer-title">
      {/* Background */}
      <div className="dealer-bg" aria-hidden="true">
        <div className="dealer-bg-orb" />
        <div className="dealer-grid-pattern" />
      </div>

      <div className="container">
        <div className="dealer-layout">
          {/* Left */}
          <div className="dealer-left fade-in">
            <div className="section-tag"><TrendingUp size={18} /> Grow With TEKZAR</div>
            <h2 className="section-title" id="dealer-title">
              Become a
              <br />
              <span>TEKZAR Dealer</span>
            </h2>
            <p className="section-subtitle">
              Join our growing network and build a profitable business on high-quality products
              with full dealer support from day one.
            </p>

            <div className="dealer-perks" role="list">
              {perks.map((perk, i) => (
                <div key={i} className="dealer-perk" role="listitem">
                  <span className="perk-icon" aria-hidden="true">{perk.icon}</span>
                  <span>{perk.text}</span>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/917200949459?text=Hi, I want to become a TEKZAR dealer"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg dealer-wa-btn"
            >
              Apply Now via WhatsApp
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Right: Form */}
          <div className="dealer-right fade-in">
            <div className="dealer-form-card">
              <h3 className="form-title">Quick Dealer Registration</h3>
              <p className="form-subtitle">Fill out the form and we'll reach out within 24 hours</p>

              {submitted ? (
                <div className="form-success" role="alert" aria-live="polite">
                  <div className="success-icon"><CheckCircle size={48} color="#16A34A" /></div>
                  <h4>Application Sent!</h4>
                  <p>We'll contact you on WhatsApp within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="dealer-form" noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="dealer-fullname" className="form-label">Full Name *</label>
                      <input
                        id="dealer-fullname"
                        name="fullName"
                        type="text"
                        className="form-input"
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dealer-business" className="form-label">Business Name *</label>
                      <input
                        id="dealer-business"
                        name="businessName"
                        type="text"
                        className="form-input"
                        placeholder="Shop / Company name"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="dealer-state" className="form-label">State *</label>
                      <select
                        id="dealer-state"
                        name="state"
                        className="form-input form-select"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select State</option>
                        {states.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="dealer-city" className="form-label">City *</label>
                      <input
                        id="dealer-city"
                        name="city"
                        type="text"
                        className="form-input"
                        placeholder="Your city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="dealer-mobile" className="form-label">Mobile Number *</label>
                    <input
                      id="dealer-mobile"
                      name="mobile"
                      type="tel"
                      className="form-input"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      autoComplete="tel"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dealer-email" className="form-label">Email Address</label>
                    <input
                      id="dealer-email"
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg form-submit">
                    Submit Registration
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
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

export default DealerSection;
