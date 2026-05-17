import React from 'react';

export default function Videos() {
  const videos = [
    {
      id: 1,
      author: 'Tech Review Weekly',
      time: '12 hours ago',
      title: 'Is the new M3 chip really that much faster?',
      views: '1.2M',
      thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2026&auto=format&fit=crop',
      duration: '14:20'
    },
    {
      id: 2,
      author: 'Code & Build',
      time: '2 days ago',
      title: 'Building a full-stack Next.js app in 10 minutes',
      views: '450K',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
      duration: '10:05'
    },
    {
      id: 3,
      author: 'Data Science Now',
      time: '5 days ago',
      title: 'Understanding Neural Networks with Animations',
      views: '890K',
      thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop',
      duration: '22:15'
    }
  ];

  return (
    <div className="th-layout" style={{ background: 'var(--primary-bg)' }}>
      <div className="container-fluid p-0">
        <div className="row g-0">
          {/* Left Sidebar */}
          <div className="col-lg-3 d-none d-lg-block p-3" style={{ height: 'calc(100vh - 56px)', position: 'sticky', top: '56px', overflowY: 'auto' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Watch</h2>
              <button className="th-btn-secondary" style={{ padding: '6px', width: '36px', height: '36px', borderRadius: '50%' }}>
                <i className="bi bi-search"></i>
              </button>
            </div>
            
            <div className="th-sidebar-nav mt-3">
              <button className="th-sidebar-link" style={{ background: 'var(--hover-bg)' }}>
                <i className="bi bi-camera-video-fill" style={{ color: '#fff', background: 'var(--accent-blue)', padding: '6px', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></i> 
                <span style={{ fontWeight: 600 }}>Home</span>
              </button>
              <button className="th-sidebar-link">
                <i className="bi bi-camera-reels-fill" style={{ color: '#000', background: '#e4e6eb', padding: '6px', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></i> 
                <span>Live</span>
              </button>
              <button className="th-sidebar-link">
                <i className="bi bi-collection-play-fill" style={{ color: '#000', background: '#e4e6eb', padding: '6px', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></i> 
                <span>Shows</span>
              </button>
              <button className="th-sidebar-link">
                <i className="bi bi-bookmark-fill" style={{ color: '#000', background: '#e4e6eb', padding: '6px', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></i> 
                <span>Saved Videos</span>
              </button>
            </div>
          </div>

          {/* Main Feed */}
          <div className="col-lg-9 col-md-12 p-0 p-lg-4 th-main-col" style={{ minHeight: 'calc(100vh - 56px)' }}>
            <div className="d-lg-none p-3 mb-3 d-flex justify-content-between align-items-center background-card">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Watch</h2>
            </div>
            
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              {videos.map(video => (
                <div key={video.id} className="th-card mb-4 overflow-hidden" style={{ borderRadius: 'var(--radius-lg)' }}>
                  <div className="p-3 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--elevated-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="bi bi-person-video2"></i>
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{video.author} <span style={{ color: 'var(--accent-blue)', fontSize: '0.8125rem', cursor: 'pointer' }}>· Follow</span></div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{video.time}</div>
                      </div>
                    </div>
                    <button className="th-btn-secondary" style={{ padding: '6px', width: '36px', height: '36px', borderRadius: '50%' }}>
                      <i className="bi bi-three-dots"></i>
                    </button>
                  </div>
                  
                  <div className="px-3 pb-2">
                    <h4 style={{ fontSize: '1rem', fontWeight: 400, marginBottom: '8px' }}>{video.title}</h4>
                  </div>
                  
                  <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000', cursor: 'pointer' }}>
                    <img src={video.thumbnail} alt={video.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem' }}>
                        <i className="bi bi-play-fill" style={{ marginLeft: '4px' }}></i>
                      </div>
                    </div>
                    <div style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8125rem', fontWeight: 600 }}>
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <div className="d-flex justify-content-between align-items-center pb-2 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
                      <div className="d-flex align-items-center gap-1">
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>{video.views} Views</span>
                      </div>
                      <div className="d-flex gap-3">
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}><i className="bi bi-hand-thumbs-up me-1"></i> 14K</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}><i className="bi bi-chat-dots me-1"></i> 2.1K</div>
                      </div>
                    </div>
                    
                    <div className="pt-2 d-flex justify-content-between">
                      <button className="th-action-btn flex-fill"><i className="bi bi-hand-thumbs-up"></i> Like</button>
                      <button className="th-action-btn flex-fill"><i className="bi bi-chat-dots"></i> Comment</button>
                      <button className="th-action-btn flex-fill"><i className="bi bi-share"></i> Share</button>
                    </div>
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
