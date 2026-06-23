import React, { useRef, useEffect } from 'react';
import './About.css';

const About = () => {
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

  const milestones = [
    { year: '2015', label: 'Founded', desc: 'Tekzar Equipments Pvt Ltd established in Coimbatore' },
    { year: '2018', label: 'Pan India', desc: 'Expanded distribution network across all major states' },
    { year: '2021', label: '5000+', desc: 'Surpassed 5000 happy customers milestone' },
    { year: '2024', label: '100+ Dealers', desc: "Built India's strongest agri-equipment dealer network" },
  ];

  const values = [
    { icon: '🎯', title: 'Our Mission', desc: 'To empower every Indian farmer with reliable, innovative, and affordable machinery that transforms their livelihood.' },
    { icon: '🌱', title: 'Our Vision', desc: 'To become India\'s most trusted agricultural equipment brand, present in every farming district of the country.' },
    { icon: '💎', title: 'Our Values', desc: 'Quality, affordability, innovation, and farmer-first service are the pillars on which TEKZAR is built.' },
  ];

  return (
    <section className="section about-section" id="about" ref={sectionRef} aria-labelledby="about-title">
      {/* Background */}
      <div className="about-bg" aria-hidden="true">
        <div className="about-orb-1" />
        <div className="about-orb-2" />
        <div className="about-lines" />
      </div>

      <div className="container">
        {/* Header */}
        <div className="about-header fade-in">
          <div className="section-tag"><span>🏭</span> About Us</div>
          <h2 className="section-title" id="about-title">
            The Story Behind <span>TEKZAR</span>
          </h2>
          <p className="section-subtitle">
            From a small importer to India's growing agri-equipment brand — our journey is driven by
            passion for farming and commitment to farmer prosperity.
          </p>
        </div>

        {/* Company Overview */}
        <div className="about-overview fade-in">
          <div className="overview-text">
            <p>
              <strong>Tekzar Equipments Pvt Ltd</strong> is a leading importer and distributor of agricultural,
              gardening, and power equipment in India. Based in Coimbatore, Tamil Nadu, we serve farmers
              and professionals across the country with a wide range of high-quality machinery.
            </p>
            <p>
              Under the brand name <strong>TEKZAR</strong> — with the tagline <em>"Excellence Made Affordable"</em> —
              we are committed to providing innovative and reliable solutions for every stage of farming,
              from soil preparation to harvest.
            </p>
            <p>
              Our product portfolio spans Brush Cutters, Power Weeders, Chainsaws, Battery Sprayers,
              Chaff Cutters, and Portable Generators — all backed by genuine spare parts support and
              a growing pan-India dealer network of 100+ partners.
            </p>
          </div>
          <div className="overview-visual" aria-hidden="true">
            <div className="overview-card overview-card-1">
              <span className="ov-num">₹</span>
              <span className="ov-label">Best Prices</span>
            </div>
            <div className="overview-card overview-card-2">
              <span className="ov-num">🇮🇳</span>
              <span className="ov-label">Made for India</span>
            </div>
            <div className="overview-card overview-card-3">
              <span className="ov-num">🔧</span>
              <span className="ov-label">Full Support</span>
            </div>
            <div className="overview-center-badge">
              <svg width="48" height="48" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <polygon points="20,2 38,32 2,32" fill="none" stroke="#FF6B00" strokeWidth="3"/>
                <polygon points="20,10 32,30 8,30" fill="#FF6B00" opacity="0.4"/>
                <line x1="20" y1="2" x2="20" y2="32" stroke="#FF6B00" strokeWidth="2"/>
              </svg>
              <span>TEKZAR</span>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="about-values" role="list">
          {values.map((v, i) => (
            <article
              key={i}
              className="value-card fade-in"
              style={{ transitionDelay: `${i * 0.1}s` }}
              role="listitem"
            >
              <div className="value-icon" aria-hidden="true">{v.icon}</div>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-desc">{v.desc}</p>
            </article>
          ))}
        </div>

        {/* Timeline */}
        <div className="about-timeline-wrap fade-in">
          <h3 className="timeline-heading">Our Journey</h3>
          <div className="about-timeline" role="list">
            {milestones.map((m, i) => (
              <div key={i} className="timeline-item" role="listitem">
                <div className="timeline-dot" aria-hidden="true" />
                <div className="timeline-year">{m.year}</div>
                <div className="timeline-content">
                  <strong>{m.label}</strong>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
