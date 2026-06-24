// src/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { useAuth } from '../firebase/AuthContext';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import './Admin.css';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-root admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <img src={logoImg} alt="TEKZAR" />
          <h1>Admin Portal</h1>
        </div>

        <h2 className="admin-login-title">Secure Login</h2>
        <p className="admin-login-sub">Sign in to manage your TEKZAR website</p>

        {error && <div className="admin-error" role="alert">{error}</div>}

        <form className="admin-form" onSubmit={handleSubmit} noValidate>
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="admin-email">Email Address</label>
            <input
              id="admin-email"
              type="email"
              className="admin-input"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              className="admin-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In to Admin Panel'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>
          🔒 Access restricted to authorized TEKZAR administrators only.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
