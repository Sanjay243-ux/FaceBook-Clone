import { useState, useRef, useEffect } from 'react';

export default function Header({ darkMode, setDarkMode, searchQuery, setSearchQuery }) {
  const [activeNav, setActiveNav] = useState('home');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { id: 'home', icon: 'bi-house-door-fill', label: 'Home' },
    { id: 'news', icon: 'bi-newspaper', label: 'Tech News' },
    { id: 'guides', icon: 'bi-journal-code', label: 'Guides' },
    { id: 'videos', icon: 'bi-play-btn-fill', label: 'Videos' },
    { id: 'groups', icon: 'bi-people-fill', label: 'Groups' },
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
        <a href="#" className="th-logo" id="logo-link">
          <div className="th-logo-icon"><i className="bi bi-cpu-fill"></i></div>
          Tech<span>Hub</span>
        </a>
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
            className={`th-header-nav-btn ${activeNav === item.id ? 'active' : ''}`}
            onClick={() => setActiveNav(item.id)}
            id={`nav-${item.id}`}
          >
            <i className={`bi ${item.icon}`}></i>
            <span className="nav-tooltip">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="th-header-right">
        <button className="th-icon-btn" title="Menu" id="menu-btn">
          <i className="bi bi-grid-3x3-gap-fill"></i>
        </button>
        <button className="th-icon-btn" title="Messenger" id="messenger-btn">
          <i className="bi bi-chat-dots-fill"></i>
          <span className="th-notif-dot"></span>
        </button>
        <button className="th-icon-btn" title="Notifications" id="notif-btn">
          <i className="bi bi-bell-fill"></i>
          <span className="th-notif-dot"></span>
        </button>
        <button
          className="th-icon-btn"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          onClick={() => setDarkMode(!darkMode)}
          id="theme-toggle"
        >
          <i className={`bi ${darkMode ? 'bi-sun-fill' : 'bi-moon-fill'}`} style={{ color: darkMode ? '#f7b928' : '#8a8d91' }}></i>
        </button>
        <div className="position-relative" ref={dropdownRef}>
          <button className="th-user-avatar-btn" onClick={() => setShowDropdown(!showDropdown)} id="user-menu-btn">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="User" />
          </button>
          {showDropdown && (
            <div className="th-dropdown" id="user-dropdown">
              <div className="th-dropdown-item">
                <i className="bi bi-person-circle"></i> Profile
              </div>
              <div className="th-dropdown-item">
                <i className="bi bi-gear"></i> Settings & Privacy
              </div>
              <div className="th-dropdown-item">
                <i className="bi bi-question-circle"></i> Help & Support
              </div>
              <div className="th-dropdown-item" onClick={() => setDarkMode(!darkMode)}>
                <i className={`bi ${darkMode ? 'bi-moon-fill' : 'bi-sun-fill'}`}></i>
                <span style={{ flex: 1 }}>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
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
              <div className="th-divider" style={{ margin: '4px 0' }}></div>
              <div className="th-dropdown-item">
                <i className="bi bi-box-arrow-right" style={{ color: 'var(--badge-news)' }}></i> Log Out
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
