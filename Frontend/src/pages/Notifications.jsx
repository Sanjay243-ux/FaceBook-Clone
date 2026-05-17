import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const INITIAL = [
  { id: 1, text: 'Sarah Chen commented on your post.', time: '12m', read: false, icon: 'bi-chat-fill', color: '#2374e1' },
  { id: 2, text: 'TechHub Editorial shared a new article.', time: '1h', read: false, icon: 'bi-newspaper', color: '#f02849' },
  { id: 3, text: 'Your guide progress was saved.', time: '3h', read: true, icon: 'bi-journal-code', color: '#31a24c' },
  { id: 4, text: 'Alex Rodriguez mentioned you in a comment.', time: 'Yesterday', read: true, icon: 'bi-at', color: '#f7b928' },
];

export default function Notifications() {
  const navigate = useNavigate();
  const [items, setItems] = useState(INITIAL);

  const unread = useMemo(() => items.filter((n) => !n.read).length, [items]);

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  const toggleRead = (id) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  };

  return (
    <div className="th-layout mt-3 mx-3">
      <div className="container-fluid" style={{ padding: '16px 12px', maxWidth: '560px', margin: '0 auto' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Notifications</h1>
          {unread > 0 && (
            <button type="button" className="btn btn-link p-0 text-decoration-none" style={{ color: 'var(--accent-blue)', fontSize: '0.9375rem' }} onClick={markAllRead}>
              Mark all as read
            </button>
          )}
        </div>

        <div className="d-flex flex-column gap-2">
          {items.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => toggleRead(n.id)}
              className="th-card text-start w-100 border-0"
              style={{
                padding: '12px 14px',
                cursor: 'pointer',
                background: n.read ? 'var(--card-bg)' : 'var(--elevated-bg)',
                opacity: n.read ? 0.92 : 1,
              }}
            >
              <div className="d-flex gap-3 align-items-start">
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: `${n.color}22`,
                    color: n.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <i className={`bi ${n.icon}`}></i>
                </div>
                <div className="flex-grow-1">
                  <div style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{n.text}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: 4 }}>{n.time}</div>
                </div>
                {!n.read && (
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-blue)', flexShrink: 0, marginTop: 6 }} />
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-4">
          <button type="button" className="th-btn-primary p-2 px-3" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
