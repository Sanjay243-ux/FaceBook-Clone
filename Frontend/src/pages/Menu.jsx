import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ITEMS = [
  { to: '/', icon: 'bi-house-door-fill', label: 'Home', desc: 'Feed & stories' },
  { to: '/news', icon: 'bi-newspaper', label: 'Tech News', desc: 'Top stories' },
  { to: '/guides', icon: 'bi-journal-code', label: 'Guides', desc: 'Learning paths' },
  { to: '/videos', icon: 'bi-play-btn-fill', label: 'Videos', desc: 'Watch' },
  { to: '/groups', icon: 'bi-people-fill', label: 'Groups', desc: 'Communities' },
  { to: '/profile', icon: 'bi-person-fill', label: 'Profile', desc: 'Your page' },
  { to: '/notifications', icon: 'bi-bell-fill', label: 'Notifications', desc: 'Alerts' },
  { to: '/settings', icon: 'bi-gear-fill', label: 'Settings', desc: 'Privacy & account' },
  { to: '/help', icon: 'bi-question-circle-fill', label: 'Help', desc: 'Support' },
];

export default function Menu() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="th-layout mt-3 mx-3">
      <div className="container-fluid" style={{ padding: '16px 12px', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px' }}>Menu</h1>

        <div className="row g-3">
          {ITEMS.map((item) => (
            <div key={item.to} className="col-6 col-md-4">
              <Link to={item.to} className="text-decoration-none">
                <div className="th-card h-100 p-3" style={{ transition: 'transform 0.15s', cursor: 'pointer' }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: 'var(--elevated-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.35rem',
                      color: 'var(--accent-blue)',
                      marginBottom: 12,
                    }}
                  >
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="th-card mt-4 p-3">
          <button type="button" className="d-flex align-items-center gap-3 border-0 bg-transparent w-100 text-start p-0" style={{ color: 'var(--text-primary)', cursor: 'pointer' }} onClick={handleLogout}>
            <i className="bi bi-box-arrow-right" style={{ fontSize: '1.25rem' }}></i>
            <span style={{ fontWeight: 600 }}>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
