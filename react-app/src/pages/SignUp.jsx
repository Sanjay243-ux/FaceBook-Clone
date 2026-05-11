import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

export default function SignUp() {
  return (
    <div className="fb-auth-page fb-signup-page">
      <div className="fb-signup-logo-container">
        <img 
          className="fb-signup-top-logo" 
          src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" 
          alt="Facebook" 
        />
      </div>
      <div className="fb-signup-card">
        <div className="fb-signup-header">
          <div>
            <h2>Join Facebook</h2>
            <p>It's quick and easy.</p>
          </div>
          <Link to="/login" className="fb-signup-close">&times;</Link>
        </div>
        <hr className="fb-auth-divider m-0 desktop-only" />
        <div className="fb-signup-body">
          <form className="fb-signup-form" onSubmit={e => e.preventDefault()}>
            <div className="fb-signup-row">
              <input type="text" placeholder="First name" className="fb-auth-input" />
              <input type="text" placeholder="Surname" className="fb-auth-input" />
            </div>
            <input type="text" placeholder="Mobile number or email address" className="fb-auth-input" />
            <input type="password" placeholder="New password" className="fb-auth-input" />
            
            <div className="fb-signup-section">
              <label className="fb-signup-label">Date of birth <i className="bi bi-question-circle-fill" style={{color: '#606770'}}></i></label>
              <div className="fb-signup-row fb-signup-selects">
                <select className="fb-auth-input" defaultValue="11">
                  {[...Array(31)].map((_, i) => (
                    <option key={i+1} value={i+1}>{i+1}</option>
                  ))}
                </select>
                <select className="fb-auth-input" defaultValue="May">
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <select className="fb-auth-input" defaultValue="2026">
                  {[...Array(120)].map((_, i) => {
                    const year = 2026 - i;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>
              </div>
            </div>

            <div className="fb-signup-section">
              <label className="fb-signup-label">Gender <i className="bi bi-question-circle-fill" style={{color: '#606770'}}></i></label>
              <div className="fb-signup-row fb-signup-radios">
                <label className="fb-signup-radio">
                  <span>Female</span>
                  <input type="radio" name="gender" value="female" />
                </label>
                <label className="fb-signup-radio">
                  <span>Male</span>
                  <input type="radio" name="gender" value="male" />
                </label>
                <label className="fb-signup-radio">
                  <span>Custom</span>
                  <input type="radio" name="gender" value="custom" />
                </label>
              </div>
            </div>
            
            <p className="fb-signup-terms">
              People who use our service may have uploaded your contact information to Facebook. <a href="#learn-more">Learn more</a>.
            </p>
            <p className="fb-signup-terms">
              By clicking Sign Up, you agree to our <a href="#terms">Terms</a>, <a href="#privacy">Privacy Policy</a> and <a href="#cookies">Cookies Policy</a>. You may receive SMS notifications from us and can opt out at any time.
            </p>

            <div className="fb-signup-footer">
              <button type="button" className="fb-auth-btn-success">Sign Up</button>
            </div>
            
            {/* Mobile login link */}
            <div className="fb-signup-mobile-login">
              <Link to="/login">Already have an account?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
