import { useState } from 'react';

const FAQ = [
  {
    q: 'How do I change my profile photo?',
    a: 'Open your profile, hover your avatar, and use the camera button. You can also update cover photos from the same header.',
  },
  {
    q: 'How does the feed filter work?',
    a: 'Use category tabs on Home (News, Guides, Tutorials, Videos) or the search bar in the header to narrow posts.',
  },
  {
    q: 'Where are notifications?',
    a: 'Click the bell in the header to open the notifications page. You can mark items as read from there.',
  },
];

export default function Help() {
  const [open, setOpen] = useState(0);

  return (
    <div className="th-layout mt-3 mx-3">
      <div className="container-fluid" style={{ padding: '16px 12px', maxWidth: '720px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>Help & support</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Find quick answers or reach the team.</p>

        <div className="th-card mb-3 p-3">
          <div className="row g-2">
            <div className="col-md-6">
              <button type="button" className="th-btn-secondary w-100 py-3">
                <i className="bi bi-book me-2"></i> Help Center
              </button>
            </div>
            <div className="col-md-6">
              <button type="button" className="th-btn-secondary w-100 py-3">
                <i className="bi bi-chat-dots me-2"></i> Contact support
              </button>
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '12px' }}>Common questions</h2>
        <div className="d-flex flex-column gap-2">
          {FAQ.map((item, i) => (
            <div key={i} className="th-card overflow-hidden">
              <button
                type="button"
                className="w-100 text-start p-3 th-btn-secondary border-0"
                style={{ borderRadius: 0 }}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <span style={{ fontWeight: 600 }}>{item.q}</span>
                <i className={`bi bi-chevron-${open === i ? 'up' : 'down'} float-end`}></i>
              </button>
              {open === i && (
                <div className="px-3 pb-3" style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="th-card mt-4 p-4 text-center">
          <p style={{ marginBottom: 12 }}>Report a problem</p>
          <button type="button" className="th-btn-primary">
            <i className="bi bi-flag me-2"></i> Something isn&apos;t working
          </button>
        </div>
      </div>
    </div>
  );
}
