export default function LeftSidebar() {
  const navLinks = [
    { icon: 'bi-house-door-fill', label: 'Home', color: '#2374e1' },
    { icon: 'bi-play-btn-fill', label: 'Watch', color: '#2374e1' },
    { icon: 'bi-shop', label: 'Marketplace', color: '#2374e1' },
    { icon: 'bi-people-fill', label: 'Groups', color: '#2374e1' },
    { icon: 'bi-controller', label: 'Gaming', color: '#2374e1' },
  ];

  const shortcuts = [
    { icon: 'bi-robot', label: 'AI & Machine Learning', color: '#a78bfa', badge: 'HOT' },
    { icon: 'bi-shield-lock-fill', label: 'Cybersecurity', color: '#f87171' },
    { icon: 'bi-tools', label: 'How-To Guides', color: '#fbbf24' },
    { icon: 'bi-megaphone-fill', label: 'Tech News Daily', color: '#34d399' },
    { icon: 'bi-code-square', label: 'Developer Community', color: '#60a5fa' },
  ];

  return (
    <div className="th-sidebar" id="left-sidebar">
      {/* Profile Card */}
      <div className="th-card" id="profile-card">
        <div className="th-profile-card">
          <div className="th-profile-avatar-wrap">
            <img src="https://api.dicebear.com/7.x/bottts/svg?seed=TechHub" alt="TechHub" />
          </div>
          <div className="th-profile-name">TechHub</div>
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

      {/* Navigation */}
      <div className="th-card" id="nav-links">
        <div className="th-sidebar-nav">
          {navLinks.map((link, i) => (
            <button key={i} className="th-sidebar-link">
              <i className={`bi ${link.icon}`} style={{ color: link.color }}></i>
              <span>{link.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Your Shortcuts */}
      <div className="th-card" id="shortcuts">
        <div className="th-sidebar-section-title">Your shortcuts</div>
        <div className="th-sidebar-nav">
          {shortcuts.map((s, i) => (
            <button key={i} className="th-sidebar-link">
              <i className={`bi ${s.icon}`} style={{ color: s.color }}></i>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Create Post Button */}
      <div style={{ padding: '8px' }}>
        <button className="th-btn-primary" id="create-post-sidebar-btn">
          <i className="bi bi-plus-lg"></i> Create Post
        </button>
      </div>

      {/* Footer */}
      <div style={{ padding: '12px 10px', fontSize: '.6875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        Privacy · Terms · Advertising · Cookies · <br/>TechHub © 2026
      </div>
    </div>
  );
}
