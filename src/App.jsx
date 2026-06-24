import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryDetail from './pages/CategoryDetail';
import About from './components/About';
import DealerSection from './components/DealerSection';
import Contact from './components/Contact';

// Admin
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import ProtectedRoute from './admin/ProtectedRoute';

import './App.css';

/* ── ScrollToTop ── */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

/* ── Public Layout (with Navbar & Footer) ── */
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main id="main-content">{children}</main>
    <Footer />
  </>
);

/* ── Inner App (uses router hooks) ── */
function AppInner() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdminRoute) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    const observeNodes = () =>
      document.querySelectorAll('.fade-in:not(.visible)').forEach((el) => observer.observe(el));
    observeNodes();
    const mo = new MutationObserver(observeNodes);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); mo.disconnect(); };
  }, [isAdminRoute]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes (no Navbar/Footer) */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
        />

        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/category/:id" element={<PublicLayout><CategoryDetail /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><div style={{ paddingTop: '70px' }}><About /></div></PublicLayout>} />
        <Route path="/dealers" element={<PublicLayout><div style={{ paddingTop: '70px' }}><DealerSection /></div></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><div style={{ paddingTop: '70px' }}><Contact /></div></PublicLayout>} />
      </Routes>
    </>
  );
}

export default AppInner;

