import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header({ darkMode, setDarkMode, searchQuery, setSearchQuery }) {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', path: '/', icon: 'bi-house-door-fill', label: 'Home' },
    { id: 'news', path: '/news', icon: 'bi-newspaper', label: 'Tech News' },
    { id: 'guides', path: '/guides', icon: 'bi-journal-code', label: 'Guides' },
    { id: 'videos', path: '/videos', icon: 'bi-play-btn-fill', label: 'Videos' },
    { id: 'groups', path: '/groups', icon: 'bi-people-fill', label: 'Groups' },
  ];

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="th-header" id="main-header">
      <div className="th-header-left">
        <Link to="/" className="th-logo" id="logo-link" style={{ textDecoration: 'none' }}>
          <div className="th-logo-icon"><i className="bi bi-cpu-fill"></i></div>
          Tech<span>Hub</span>
        </Link>
        <div className="th-search-wrap d-none d-md-block">
          <i className="bi bi-search th-search-icon"></i>
          <input
            type="text" className="th-search-box"
            placeholder="Search TechHub"
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            id="search-input"
          />
        </div>
      </div>

      <div className="th-header-center d-none d-lg-flex">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`th-header-nav-btn ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
            id={`nav-${item.id}`}
          >
            <i className={`bi ${item.icon}`}></i>
            <span className="nav-tooltip">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="th-header-right">
        <button className="th-icon-btn d-none d-lg-flex" title="Menu" id="menu-btn" onClick={() => navigate('/menu')}>
          <i className="bi bi-grid-3x3-gap-fill"></i>
        </button>
        <button className="th-icon-btn" title="Notifications" id="notif-btn" onClick={() => navigate('/notifications')}>
          <i className="bi bi-bell-fill"></i>
          <span className="th-notif-dot"></span>
        </button>
        <button
          className="th-icon-btn d-none d-sm-flex"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          onClick={() => setDarkMode(!darkMode)}
          id="theme-toggle"
        >
          <i className={`bi ${darkMode ? 'bi-sun-fill' : 'bi-moon-fill'}`} style={{ color: darkMode ? '#f7b928' : '#8a8d91' }}></i>
        </button>
        <div className="position-relative" ref={dropdownRef}>
          <button className="th-user-avatar-btn" onClick={() => setShowDropdown(!showDropdown)} id="user-menu-btn">
            <img src={user?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Unknown"} alt="User" />
          </button>
          {showDropdown && (
            <div className="th-dropdown" id="user-dropdown" style={{ padding: '16px 8px 8px 8px' }}>
              <div className="th-dropdown-card">
                <div className="th-dropdown-profile-info" onClick={() => { navigate('/profile'); setShowDropdown(false); }}>
                  <img src={user?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Unknown"} alt="User" className="th-dropdown-avatar" />
                  <div className="th-dropdown-name">{user ? `${user.first_name} ${user.last_name}` : 'User'}</div>
                </div>
                <div className="th-divider" style={{ margin: '0 16px' }}></div>
                <div className="th-dropdown-see-all" onClick={() => { navigate('/profile'); setShowDropdown(false); }}>
                  See all profiles
                </div>
              </div>

              <div className="th-dropdown-item" onClick={() => { navigate('/settings'); setShowDropdown(false); }}>
                <i className="bi bi-gear-fill"></i>
                <span className="th-dropdown-text">Settings & privacy</span>
                <i className="bi bi-chevron-right th-dropdown-arrow"></i>
              </div>
              <div className="th-dropdown-item" onClick={() => { navigate('/help'); setShowDropdown(false); }}>
                <i className="bi bi-question-circle-fill"></i>
                <span className="th-dropdown-text">Help & support</span>
                <i className="bi bi-chevron-right th-dropdown-arrow"></i>
              </div>
              <div className="th-dropdown-item" onClick={() => setDarkMode(!darkMode)}>
                <i className={`bi ${darkMode ? 'bi-moon-fill' : 'bi-sun-fill'}`}></i>
                <span className="th-dropdown-text">Display & accessibility</span>
                <div style={{
                  width: 36, height: 20, borderRadius: 10,
                  background: darkMode ? 'var(--accent-blue)' : 'var(--elevated-bg)',
                  position: 'relative', transition: 'background .2s'
                }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: '50%', background: '#fff',
                    position: 'absolute', top: 2,
                    left: darkMode ? 18 : 2, transition: 'left .2s'
                  }}></div>
                </div>
              </div>
              <div className="th-dropdown-item">
                <i className="bi bi-chat-left-text-fill"></i>
                <span className="th-dropdown-text">Give feedback</span>
              </div>
              <div
                className="th-dropdown-item"
                onClick={() => {
                  logout();
                  setShowDropdown(false);
                  navigate('/login');
                }}
              >
                <i className="bi bi-box-arrow-right"></i>
                <span className="th-dropdown-text">Log Out</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Top Navigation */}
      <div className="th-mobile-nav d-flex d-lg-none">
        {navItems.map(item => (
          <button
            key={`mobile-${item.id}`}
            className={`th-mobile-nav-btn ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <i className={`bi ${item.icon}`}></i>
          </button>
        ))}
        <button 
          className={`th-mobile-nav-btn ${location.pathname === '/menu' ? 'active' : ''}`} 
          onClick={() => navigate('/menu')}
        >
          <i className="bi bi-list"></i>
        </button>
      </div>
    </header>
  );
}
