import React, { useState } from 'react';

export default function Groups() {
  const [joined, setJoined] = useState(() => new Set());

  const groups = [
    { id: 1, name: 'React Developers Global', members: '145K', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop', active: true },
    { id: 2, name: 'UI/UX Design Inspiration', members: '82K', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop', active: false },
    { id: 3, name: 'Cybersecurity Enthusiasts', members: '210K', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop', active: true },
  ];

  const toggleJoin = (id) => {
    setJoined((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="th-layout">
      <div className="container-fluid p-0">
        <div className="row g-0">
          {/* Left Sidebar */}
          <div className="col-lg-3 d-none d-lg-block p-3 border-end" style={{ height: 'calc(100vh - 56px)', position: 'sticky', top: '56px', overflowY: 'auto', borderColor: 'var(--border-color)' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Groups</h2>
              <button className="th-btn-secondary" style={{ padding: '6px', width: '36px', height: '36px', borderRadius: '50%' }}>
                <i className="bi bi-gear-fill"></i>
              </button>
            </div>
            
            <div className="th-sidebar-nav mt-3">
              <button className="th-sidebar-link" style={{ background: 'var(--hover-bg)' }}>
                <i className="bi bi-grid-fill" style={{ color: 'var(--accent-blue)', background: 'rgba(35, 116, 225, 0.1)', padding: '6px', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></i> 
                <span style={{ fontWeight: 600 }}>Your Feed</span>
              </button>
              <button className="th-sidebar-link">
                <i className="bi bi-compass-fill" style={{ color: '#000', background: '#e4e6eb', padding: '6px', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></i> 
                <span>Discover</span>
              </button>
              <button className="th-btn-primary w-100 mt-3" style={{ background: 'rgba(35, 116, 225, 0.1)', color: 'var(--accent-blue)' }}>
                <i className="bi bi-plus-lg"></i> Create New Group
              </button>

              <div className="th-divider"></div>
              <div className="d-flex justify-content-between align-items-center px-2 mb-2">
                <div className="th-sidebar-section-title" style={{ padding: 0 }}>Groups you've joined</div>
                <span style={{ fontSize: '0.875rem', color: 'var(--accent-blue)', cursor: 'pointer' }}>See all</span>
              </div>
              
              {groups.map(g => (
                <button key={g.id} className="th-sidebar-link px-2">
                  <img src={g.image} alt={g.name} style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div className="text-start">
                    <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{g.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{g.active ? 'Last active an hour ago' : 'Last active 3 days ago'}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Feed */}
          <div className="col-lg-9 col-md-12 p-4 th-main-col" style={{ background: 'var(--primary-bg)', minHeight: 'calc(100vh - 56px)' }}>
            <div className="d-lg-none mb-3 d-flex justify-content-between align-items-center">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Groups</h2>
            </div>
            
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Recent Activity</h3>
              
              {groups.map(group => (
                <div key={group.id} className="th-card mb-4 overflow-hidden">
                  <div className="p-3 d-flex align-items-center gap-2 border-bottom" style={{ borderColor: 'var(--border-color)', background: 'var(--elevated-bg)' }}>
                    <img src={group.image} alt={group.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.05rem' }}>{group.name}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{group.members} members · Recommended for you</div>
                    </div>
                    <button
                      type="button"
                      className={`${joined.has(group.id) ? 'th-btn-secondary' : 'th-btn-primary'} ms-auto`}
                      style={{ width: 'auto', padding: '6px 16px' }}
                      onClick={() => toggleJoin(group.id)}
                    >
                      {joined.has(group.id) ? 'Joined' : 'Join'}
                    </button>
                  </div>
                  
                  <div className="p-3">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="bi bi-person-fill"></i>
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Alex Developer <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>posted an update</span></div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>4 hrs</div>
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-primary)' }}>Does anyone have good resources for learning advanced React patterns? I'm trying to wrap my head around custom hooks and context optimization. Thanks!</p>
                  </div>
                  
                  <div className="p-2 d-flex justify-content-between border-top" style={{ borderColor: 'var(--border-color)' }}>
                    <button className="th-action-btn flex-fill"><i className="bi bi-hand-thumbs-up"></i> Like</button>
                    <button className="th-action-btn flex-fill"><i className="bi bi-chat-dots"></i> Comment</button>
                    <button className="th-action-btn flex-fill"><i className="bi bi-share"></i> Share</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
