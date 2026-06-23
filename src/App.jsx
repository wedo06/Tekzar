import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import WhyChoose from './components/WhyChoose';
import FeaturedProducts from './components/FeaturedProducts';
import StatsSection from './components/StatsSection';
import DealerSection from './components/DealerSection';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

/* ── Marquee / Ticker Banner ── */
const TickerBanner = () => {
  const items = [
    '⚡ Brush Cutters',
    '🌾 Power Weeders',
    '🪚 Chainsaws',
    '💧 Battery Sprayers',
    '🌿 Chaff Cutters',
    '⚡ Portable Generators',
    '🛡️ Warranty on All Products',
    '🤝 100+ Dealers Pan India',
    '✅ 5000+ Happy Farmers',
    '🚀 Excellence Made Affordable',
  ];

  return (
    <div className="ticker-banner" aria-label="Ticker banner">
      <div className="ticker-track" aria-hidden="true">
        {/* Duplicate for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <span key={i} className="ticker-item">
            {item}
            <span className="ticker-dot">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ── Main App ── */
function App() {
  /* IntersectionObserver for all .fade-in elements */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TickerBanner />
        <Categories />
        <WhyChoose />
        <FeaturedProducts />
        <StatsSection />
        <DealerSection />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
