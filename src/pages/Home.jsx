import React from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import WhyChoose from '../components/WhyChoose';
import FeaturedProducts from '../components/FeaturedProducts';
import StatsSection from '../components/StatsSection';
import Testimonials from '../components/Testimonials';

const TickerBanner = () => {
  const items = [
    'Brush Cutters',
    'Power Weeders',
    'Chainsaws',
    'Battery Sprayers',
    'Chaff Cutters',
    'Portable Generators',
    'Warranty on All Products',
    '200+ Dealers',
    '1L+ Happy Farmers',
    'Excellence Made Affordable',
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

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <TickerBanner />
      <Categories />
      <WhyChoose />
      <FeaturedProducts />
      <StatsSection />
      <Testimonials />
    </div>
  );
};

export default Home;
