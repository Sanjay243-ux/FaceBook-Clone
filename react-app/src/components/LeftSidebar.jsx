import { useNavigate } from 'react-router-dom';

export default function LeftSidebar() {
  const navigate = useNavigate();
  const navLinks = [
    { icon: 'bi-house-door-fill', label: 'Home', path: '/', color: '#2374e1' },
    { icon: 'bi-play-btn-fill', label: 'Watch', path: '/videos', color: '#2374e1' },
    { icon: 'bi-people-fill', label: 'Groups', path: '/groups', color: '#2374e1' },
  ];

  const shortcuts = [
    { icon: 'bi-robot', label: 'AI & Machine Learning', path: '/news', color: '#a78bfa', badge: 'HOT' },
    { icon: 'bi-shield-lock-fill', label: 'Cybersecurity', path: '/guides', color: '#f87171' },
    { icon: 'bi-tools', label: 'How-To Guides', path: '/guides', color: '#fbbf24' },
    { icon: 'bi-megaphone-fill', label: 'Tech News Daily', path: '/news', color: '#34d399' },
    { icon: 'bi-code-square', label: 'Developer Community', path: '/groups', color: '#60a5fa' },
  ];

  const openCreatePost = () => {
    const el = document.getElementById('create-post-input');
    if (el) el.click();
  };

  return (
    <div className="th-sidebar" id="left-sidebar">
      <div className="th-card" id="profile-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
        <div className="th-profile-card">
          <div className="th-profile-avatar-wrap">
            <img src="https://api.dicebear.com/7.x/bottts/svg?seed=TechHub" alt="TechHub" />
          </div>
          <div
            className="th-profile-name"
            onMouseOver={(e) => {
              e.target.style.textDecoration = 'underline';
            }}
            onMouseOut={(e) => {
              e.target.style.textDecoration = 'none';
            }}
          >
            TechHub
          </div>
          <div className="th-profile-tagline">Your Daily Dose of Tech ⚡</div>
          <div className="th-profile-stats">
            <div className="th-profile-stat">
              <div className="th-profile-stat-num">128K</div>
              <div className="th-profile-stat-label">Followers</div>
            </div>
            <div className="th-profile-stat">
              <div className="th-profile-stat-num">95K</div>
              <div className="th-profile-stat-label">Likes</div>
            </div>
            <div className="th-profile-stat">
              <div className="th-profile-stat-num">2.4K</div>
              <div className="th-profile-stat-label">Posts</div>
            </div>
          </div>
        </div>
      </div>

      <div className="th-card" id="nav-links">
        <div className="th-sidebar-nav">
          {navLinks.map((link, i) => (
            <button key={i} type="button" className="th-sidebar-link" onClick={() => navigate(link.path)}>
              <i className={`bi ${link.icon}`} style={{ color: link.color }}></i>
              <span>{link.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="th-card" id="shortcuts">
        <div className="th-sidebar-section-title">Your shortcuts</div>
        <div className="th-sidebar-nav">
          {shortcuts.map((s, i) => (
            <button key={i} type="button" className="th-sidebar-link" onClick={() => navigate(s.path)}>
              <i className={`bi ${s.icon}`} style={{ color: s.color }}></i>
              <span>{s.label}</span>
              {s.badge && (
                <span style={{ marginLeft: 'auto', fontSize: '0.65rem', fontWeight: 700, color: '#f3425f' }}>{s.badge}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '8px' }}>
        <button type="button" className="th-btn-primary" id="create-post-sidebar-btn" onClick={openCreatePost}>
          <i className="bi bi-plus-lg"></i> Create Post
        </button>
      </div>

      <div style={{ padding: '12px 10px', fontSize: '.6875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        Privacy · Terms · Advertising · Cookies · <br />
        TechHub © 2026
      </div>
    </div>
  );
}
