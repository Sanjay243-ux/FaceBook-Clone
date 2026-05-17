import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || data.error || 'Login failed');
      }
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fb-auth-page">
      <div className="fb-auth-container">
        
        {/* Mobile Language Selector (Mobile Only) */}
        <div className="fb-auth-mobile-lang d-block d-md-none" style={{ textAlign: 'center', fontSize: '13px', color: '#65676b', marginBottom: '16px', marginTop: '8px' }}>
          <span style={{ fontWeight: 600 }}>English (UK)</span> &middot; <a href="#hi" style={{ color: '#1877f2', textDecoration: 'none' }}>हिन्दी</a> &middot; <a href="#te" style={{ color: '#1877f2', textDecoration: 'none' }}>తెలుగు</a> &middot; <a href="#ta" style={{ color: '#1877f2', textDecoration: 'none' }}>தமிழ்</a>
        </div>

        {/* Left side (Desktop only) / Top (Mobile) */}
        <div className="fb-auth-left">
          <img 
            className="fb-auth-logo" 
            src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" 
            alt="Facebook" 
          />
          <h2 className="fb-auth-subtitle">
            Connect with friends and the world around you on Facebook.
          </h2>
        </div>
        
        {/* Right side form */}
        <div className="fb-auth-right">
          <div className="fb-auth-card">
            <form
              className="fb-auth-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              {error && <div style={{ color: 'red', fontSize: '13px', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}
              <input 
                type="text" 
                placeholder="Mobile number or email address" 
                className="fb-auth-input" 
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="fb-auth-input" 
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
              <button type="submit" className="fb-auth-btn-primary" disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
              </button>
              <a href="#forgot" className="fb-auth-forgot">Forgotten password?</a>
              <hr className="fb-auth-divider" />
              <Link to="/signup" className="fb-auth-btn-success">Create new account</Link>
            </form>
          </div>
          <div className="fb-auth-create-page">
            <a href="#create-page"><strong>Create a Page</strong></a> for a celebrity, brand or business.
          </div>
        </div>

        {/* Mobile footer */}
        <div className="fb-auth-mobile-meta">
          <div style={{fontSize: '12px', color: '#8a8d91', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'}}>
            <i className="bi bi-meta" style={{fontSize: '16px'}}></i> Meta
          </div>
        </div>
      </div>
    </div>
  );
}
