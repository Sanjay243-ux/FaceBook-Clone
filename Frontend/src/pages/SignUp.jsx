import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ValidationCard from '../components/ValidationCard';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const passwordCriteria = [
    { id: 1, label: 'At least 8 characters', met: password.length >= 8 },
    { id: 2, label: 'Contains a number', met: /\d/.test(password) },
    { id: 3, label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { id: 4, label: 'Contains special character', met: /[^A-Za-z0-9]/.test(password) }
  ];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setError('');
    if (passwordCriteria.some(c => !c.met)) {
      setIsPasswordFocused(true);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          first_name: firstName, 
          last_name: lastName, 
          email: email, 
          password: password 
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Handle array of Zod validation errors, or fallback to standard error string
        if (data.errors && Array.isArray(data.errors)) {
           throw new Error(data.errors[0].message);
        }
        throw new Error(data.message || data.error || 'Signup failed');
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
          <form
            className="fb-signup-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUp();
            }}
          >
            {error && <div style={{ color: 'red', fontSize: '13px', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}
            <div className="fb-signup-row">
              <input type="text" placeholder="First name" className="fb-auth-input" value={firstName} onChange={e => setFirstName(e.target.value)} />
              <input type="text" placeholder="Surname" className="fb-auth-input" value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
            <input type="text" placeholder="Mobile number or email address" className="fb-auth-input" value={email} onChange={e => setEmail(e.target.value)} />
            
            <div style={{ position: 'relative' }}>
              <input 
                type="password" 
                placeholder="New password" 
                className="fb-auth-input" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
              <ValidationCard 
                title="Password Requirements" 
                criteria={passwordCriteria} 
                isVisible={isPasswordFocused || password.length > 0} 
                placement="bottom"
              />
            </div>
            
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
              <button type="submit" className="fb-auth-btn-success" disabled={loading}>
                {loading ? 'Creating...' : 'Sign Up'}
              </button>
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
