import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    sessionStorage.setItem('techhub-auth', '1');
    navigate('/');
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
              <input type="text" placeholder="Mobile number or email address" className="fb-auth-input" autoComplete="username" />
              <input type="password" placeholder="Password" className="fb-auth-input" autoComplete="current-password" />
              <button type="submit" className="fb-auth-btn-primary">
                Log In
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
