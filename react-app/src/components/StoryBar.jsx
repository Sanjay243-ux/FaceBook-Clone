export default function StoryBar() {
  const stories = [
    { label: 'AI & ML', icon: 'bi-robot', gradient: 'linear-gradient(135deg,#667eea,#764ba2)' },
    { label: 'Web Dev', icon: 'bi-globe2', gradient: 'linear-gradient(135deg,#f093fb,#f5576c)' },
    { label: 'Cybersec', icon: 'bi-shield-fill-check', gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)' },
    { label: 'DevOps', icon: 'bi-gear-wide-connected', gradient: 'linear-gradient(135deg,#43e97b,#38f9d7)' },
    { label: 'Mobile', icon: 'bi-phone-fill', gradient: 'linear-gradient(135deg,#fa709a,#fee140)' },
    { label: 'Cloud', icon: 'bi-cloud-fill', gradient: 'linear-gradient(135deg,#a18cd1,#fbc2eb)' },
    { label: 'Blockchain', icon: 'bi-link-45deg', gradient: 'linear-gradient(135deg,#89f7fe,#66a6ff)' },
  ];

  return (
    <div className="th-card th-story-bar-wrap" id="story-bar">
      <div className="th-story-bar">
        <div className="th-story-item th-story-create" id="create-story">
          <div className="th-story-create-icon"><i className="bi bi-plus-lg"></i></div>
          <span style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>Create<br/>story</span>
        </div>
        {stories.map((s, i) => (
          <div key={i} className="th-story-item" id={`story-${i}`}>
            <div className="th-story-item-bg" style={{ background: s.gradient }}></div>
            <div className="th-story-item-overlay"></div>
            <div className="th-story-item-avatar"><i className={`bi ${s.icon}`}></i></div>
            <div className="th-story-item-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
