import React, { useRef, useEffect } from 'react';
import { Info, Target, Eye, Diamond, MapPin, Wrench } from 'lucide-react';
import logoImg from '../assets/logo.png';
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
    { year: '2015', label: 'Founded', desc: 'Tekzar Equipments Pvt Ltd established in Coimbatore, Tamil Nadu' },
    { year: '2018', label: 'Kerala & TN', desc: 'Expanded distribution network across Kerala and Tamil Nadu' },
    { year: '2021', label: '5000+', desc: 'Surpassed 5000 happy customers milestone' },
    { year: '2024', label: '200+ Dealers', desc: 'Built the strongest agri-equipment dealer network in South India' },
  ];

  const directors = [
    { name: 'Sabari', title: 'Director', initials: 'SA', color: '#FF6B00' },
    { name: 'Antrow Simon', title: 'Director', initials: 'AS', color: '#E65C00' },
    { name: 'Sakthivel', title: 'Director', initials: 'SK', color: '#FF8C42' },
  ];

  const values = [
    { icon: <Target size={32} />, title: 'Our Mission', desc: 'To empower every farmer in Kerala and Tamil Nadu with reliable, innovative, and affordable machinery that transforms their livelihood.' },
    { icon: <Eye size={32} />, title: 'Our Vision', desc: 'To become the most trusted agricultural equipment brand across Kerala and Tamil Nadu, present in every farming district.' },
    { icon: <Diamond size={32} />, title: 'Our Values', desc: 'Quality, affordability, innovation, and farmer-first service are the pillars on which TEKZAR is built.' },
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
          <div className="section-tag"><Info size={18} /> About Us</div>
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
              gardening, and power equipment. Based in Coimbatore, Tamil Nadu, we proudly serve farmers
              and professionals across <strong>Kerala and Tamil Nadu</strong> with a wide range of high-quality machinery.
            </p>
            <p>
              Under the brand name <strong>TEKZAR</strong> — with the tagline <em>"Excellence Made Affordable"</em> —
              we are committed to providing innovative and reliable solutions for every stage of farming,
              from soil preparation to harvest.
            </p>
            <p>
              Our product portfolio spans Brush Cutters, Power Weeders, Chainsaws, Battery Sprayers,
              Chaff Cutters, and Portable Generators — all backed by genuine spare parts support and
              a growing dealer network of <strong>200+ partners</strong> across South India.
            </p>
          </div>
          <div className="overview-visual" aria-hidden="true">
            <div className="overview-card overview-card-1">
              <span className="ov-num">₹</span>
              <span className="ov-label">Best Prices</span>
            </div>
            <div className="overview-card overview-card-2">
              <span className="ov-num"><MapPin size={24} /></span>
              <span className="ov-label">Made for India</span>
            </div>
            <div className="overview-card overview-card-3">
              <span className="ov-num"><Wrench size={24} /></span>
              <span className="ov-label">Full Support</span>
            </div>
            <div className="overview-center-badge" style={{ padding: '16px', background: 'var(--white)', borderRadius: '50%' }}>
              <img src={logoImg} alt="TEKZAR Logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
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
        {/* Directors / Leadership */}
        <div className="about-leadership-wrap fade-in">
          <h3 className="timeline-heading">Meet Our Leadership</h3>
          <div className="directors-grid">
            {directors.map((d, i) => (
              <div key={i} className="director-card">
                <div className="director-avatar" style={{ background: `linear-gradient(135deg, ${d.color}, #1a1a1a)` }}>
                  <span>{d.initials}</span>
                </div>
                <h4 className="director-name">{d.name}</h4>
                <p className="director-title">{d.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
