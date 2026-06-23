import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryDetail from './pages/CategoryDetail';
import About from './components/About';
import DealerSection from './components/DealerSection';
import Contact from './components/Contact';
import './App.css';

/* ── ScrollToTop ── */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
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

    const observeNodes = () => {
      const elements = document.querySelectorAll('.fade-in:not(.visible)');
      elements.forEach((el) => observer.observe(el));
    };

    // Observe immediately and then on changes
    observeNodes();
    const mutationObserver = new MutationObserver(observeNodes);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<CategoryDetail />} />
          <Route path="/about" element={<div style={{paddingTop: '70px'}}><About /></div>} />
          <Route path="/dealers" element={<div style={{paddingTop: '70px'}}><DealerSection /></div>} />
          <Route path="/contact" element={<div style={{paddingTop: '70px'}}><Contact /></div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
