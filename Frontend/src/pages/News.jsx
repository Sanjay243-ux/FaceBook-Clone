import React from 'react';

export default function News() {
  const newsArticles = [
    {
      id: 1,
      source: 'TechCrunch',
      sourceIcon: 'bi-rocket-takeoff-fill',
      time: '2 hours ago',
      title: 'OpenAI announces new breakthrough in conversational AI models',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
      summary: 'The new model exhibits reasoning capabilities that far surpass previous iterations, setting a new benchmark for the industry.',
      likes: '1.2K',
      comments: 345,
    },
    {
      id: 2,
      source: 'The Verge',
      sourceIcon: 'bi-laptop-fill',
      time: '5 hours ago',
      title: 'Apple prepares for its biggest MacBook redesign in years',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2026&auto=format&fit=crop',
      summary: 'Rumors suggest the next iteration will feature a completely new chassis, advanced cooling, and next-generation Apple Silicon.',
      likes: '850',
      comments: 124,
    },
    {
      id: 3,
      source: 'Wired',
      sourceIcon: 'bi-cpu-fill',
      time: '12 hours ago',
      title: 'The global chip shortage is finally showing signs of easing',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
      summary: 'Major manufacturers report stabilization in supply chains, though some sectors may still face constraints through next year.',
      likes: '3.4K',
      comments: 892,
    }
  ];

  return (
    <div className="th-layout mt-3 mx-3">
      <div className="container-fluid p-0">
        <div className="row g-0">
          {/* Left Sidebar */}
          <div className="col-lg-3 d-none d-lg-block p-3" style={{ height: 'calc(100vh - 56px)', position: 'sticky', top: '56px', overflowY: 'auto' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Tech News</h2>
              <button className="th-btn-secondary" style={{ padding: '6px', width: '36px', height: '36px', borderRadius: '50%' }}>
                <i className="bi bi-gear-fill"></i>
              </button>
            </div>
            
            <div className="th-sidebar-nav mt-3">
              <button className="th-sidebar-link" style={{ background: 'var(--hover-bg)' }}>
                <i className="bi bi-newspaper" style={{ color: 'var(--accent-blue)', background: 'rgba(35, 116, 225, 0.1)', padding: '6px', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></i> 
                <span style={{ fontWeight: 600 }}>Top Stories</span>
              </button>
              <button className="th-sidebar-link">
                <i className="bi bi-bookmark-fill" style={{ color: '#000', background: '#e4e6eb', padding: '6px', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></i> 
                <span>Saved Articles</span>
              </button>
              <div className="th-sidebar-section-title mt-2">Categories</div>
              <button className="th-sidebar-link"><i className="bi bi-robot" style={{ color: '#764ba2' }}></i> Artificial Intelligence</button>
              <button className="th-sidebar-link"><i className="bi bi-phone-fill" style={{ color: '#f5576c' }}></i> Mobile Technology</button>
              <button className="th-sidebar-link"><i className="bi bi-cpu-fill" style={{ color: '#00f2fe' }}></i> Hardware & Computing</button>
              <button className="th-sidebar-link"><i className="bi bi-shield-lock-fill" style={{ color: '#38f9d7' }}></i> Cybersecurity</button>
            </div>
          </div>

          {/* Main Feed */}
          <div className="col-lg-6 col-md-12 p-3 th-main-col" style={{ maxWidth: '680px', margin: '0 auto' }}>
            <div className="d-lg-none mb-3 d-flex justify-content-between align-items-center">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Tech News</h2>
            </div>
            
            <div className="th-card p-3 mb-3 d-flex gap-2 align-items-center" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
              <button className="th-btn-secondary rounded-pill px-3 py-2" style={{ background: 'var(--accent-blue)', color: '#fff' }}>For you</button>
              <button className="th-btn-secondary rounded-pill px-3 py-2">Following</button>
              <button className="th-btn-secondary rounded-pill px-3 py-2">Latest</button>
              <button className="th-btn-secondary rounded-pill px-3 py-2">Popular</button>
            </div>

            {newsArticles.map(article => (
              <div key={article.id} className="th-card mb-3">
                <div className="p-3 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--elevated-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                      <i className={`bi ${article.sourceIcon}`}></i>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{article.source}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{article.time}</div>
                    </div>
                  </div>
                  <button className="th-btn-secondary" style={{ padding: '6px', width: '36px', height: '36px', borderRadius: '50%' }}>
                    <i className="bi bi-three-dots"></i>
                  </button>
                </div>
                
                <div className="px-3 pb-2">
                  <h4 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '8px' }}>{article.title}</h4>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>{article.summary}</p>
                </div>
                
                <img src={article.image} alt={article.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
                
                <div className="p-3 pb-0">
                  <div className="d-flex justify-content-between align-items-center pb-2 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="d-flex align-items-center gap-1">
                      <span style={{ background: '#2374e1', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>👍</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>{article.likes}</span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
                      {article.comments} comments
                    </div>
                  </div>
                </div>
                
                <div className="p-2 d-flex justify-content-between">
                  <button className="th-action-btn flex-fill"><i className="bi bi-hand-thumbs-up"></i> Like</button>
                  <button className="th-action-btn flex-fill"><i className="bi bi-chat-dots"></i> Comment</button>
                  <button className="th-action-btn flex-fill"><i className="bi bi-share"></i> Share</button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="col-lg-3 d-none d-xl-block p-3" style={{ height: 'calc(100vh - 56px)', position: 'sticky', top: '56px', overflowY: 'auto' }}>
            <h6 style={{ color: 'var(--text-muted)', fontWeight: 600, marginBottom: '16px' }}>Trending Topics</h6>
            {['#WWDC2026', '#AIAct', '#QuantumComputing', '#SpaceX', '#React19'].map((tag, i) => (
              <div key={i} className="mb-3 d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--elevated-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-hash"></i>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{tag}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{(10 - i) * 12}K posts</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
