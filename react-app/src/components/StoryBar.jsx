import React, { useState, useEffect, useCallback } from 'react';

export default function StoryBar() {
  const [activeStory, setActiveStory] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showCreateStory, setShowCreateStory] = useState(false);

  const closeStory = useCallback(() => {
    setActiveStory(null);
    setProgress(0);
  }, []);

  const stories = [
    { id: 1, label: 'AI & ML', icon: 'bi-robot', gradient: 'linear-gradient(135deg,#667eea,#764ba2)', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, label: 'Web Dev', icon: 'bi-globe2', gradient: 'linear-gradient(135deg,#f093fb,#f5576c)', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, label: 'Cybersec', icon: 'bi-shield-fill-check', gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop' },
    { id: 4, label: 'DevOps', icon: 'bi-gear-wide-connected', gradient: 'linear-gradient(135deg,#43e97b,#38f9d7)', image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1000&auto=format&fit=crop' },
    { id: 5, label: 'Mobile', icon: 'bi-phone-fill', gradient: 'linear-gradient(135deg,#fa709a,#fee140)', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop' },
    { id: 6, label: 'Cloud', icon: 'bi-cloud-fill', gradient: 'linear-gradient(135deg,#a18cd1,#fbc2eb)', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop' },
    { id: 7, label: 'Blockchain', icon: 'bi-link-45deg', gradient: 'linear-gradient(135deg,#89f7fe,#66a6ff)', image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1000&auto=format&fit=crop' },
  ];

  useEffect(() => {
    if (!activeStory) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeStory]);

  useEffect(() => {
    let timer;
    if (activeStory) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            closeStory();
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [activeStory, closeStory]);

  const openStory = (story) => {
    setActiveStory(story);
    setProgress(0);
  };

  return (
    <>
      <div className="th-card th-story-bar-wrap" id="story-bar">
        <div className="th-story-bar">
          <div className="th-story-item th-story-create" id="create-story" onClick={() => setShowCreateStory(true)}>
            <div className="th-story-create-icon"><i className="bi bi-plus-lg"></i></div>
            <span style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>Create<br/>story</span>
          </div>
          {stories.map((s, i) => (
            <div key={i} className="th-story-item" id={`story-${i}`} onClick={() => openStory(s)}>
              <div className="th-story-item-bg" style={{ backgroundImage: `url(${s.image})`, backgroundSize: 'cover' }}></div>
              <div className="th-story-item-overlay"></div>
              <div className="th-story-item-avatar"><i className={`bi ${s.icon}`}></i></div>
              <div className="th-story-item-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {showCreateStory && (
        <div className="th-create-post-overlay">
          <div className="th-create-post-modal" style={{ maxWidth: '600px' }}>
            <div className="th-create-post-header">
              <h3 className="mb-0 text-center w-100" style={{ fontSize: '1.25rem', fontWeight: 700 }}>Create Story</h3>
              <button className="th-close-modal-btn" onClick={() => setShowCreateStory(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="th-divider" style={{ margin: 0 }}></div>
            
            <div className="th-create-post-body text-center" style={{ padding: '40px 20px' }}>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <div 
                  className="th-card" 
                  style={{ width: '180px', height: '250px', background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', borderRadius: 'var(--radius-lg)', transition: 'transform 0.2s', boxShadow: 'var(--shadow-md)' }} 
                  onClick={() => setShowCreateStory(false)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{ background: 'rgba(255,255,255,0.2)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <i className="bi bi-fonts" style={{ fontSize: '1.8rem' }}></i>
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Create a<br />Text Story</span>
                </div>
                
                <div 
                  className="th-card" 
                  style={{ width: '180px', height: '250px', background: 'linear-gradient(135deg, #f02849, #fa709a)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', borderRadius: 'var(--radius-lg)', transition: 'transform 0.2s', boxShadow: 'var(--shadow-md)' }} 
                  onClick={() => setShowCreateStory(false)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{ background: 'rgba(255,255,255,0.2)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <i className="bi bi-images" style={{ fontSize: '1.8rem' }}></i>
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '1.1rem', textAlign: 'center', padding: '0 8px' }}>Create a<br />Photo Story</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeStory && (
        <div className="th-story-viewer-overlay">
          <button className="th-story-close-btn" onClick={closeStory}>
            <i className="bi bi-x-lg"></i>
          </button>
          <div className="th-story-viewer-logo">
            <i className="bi bi-cpu-fill" style={{ color: 'var(--accent-cyan)', marginRight: '8px' }}></i> TechHub
          </div>
          
          <div className="th-story-viewer-container">
            <div className="th-story-nav-btn d-none d-md-flex">
              <i className="bi bi-chevron-left"></i>
            </div>

            <div className="th-story-viewer-card" style={{ backgroundImage: `url(${activeStory.image})` }}>
              <div className="th-story-viewer-gradient"></div>
              
              <div className="th-story-progress-container">
                <div className="th-story-progress-bar">
                  <div className="th-story-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              <div className="th-story-viewer-header">
                <div className="d-flex align-items-center gap-2">
                  <div className="th-story-viewer-avatar">
                    <i className={`bi ${activeStory.icon}`}></i>
                  </div>
                  <div>
                    <div className="th-story-viewer-name">{activeStory.label}</div>
                    <div className="th-story-viewer-time">2h</div>
                  </div>
                </div>
                <div className="d-flex gap-3 text-white">
                  <i className="bi bi-play-fill" style={{ fontSize: '1.5rem', cursor: 'pointer' }}></i>
                  <i className="bi bi-volume-up-fill" style={{ fontSize: '1.5rem', cursor: 'pointer' }}></i>
                  <i className="bi bi-three-dots" style={{ fontSize: '1.5rem', cursor: 'pointer' }}></i>
                </div>
              </div>

              <div className="th-story-reply-container">
                <input type="text" className="th-story-reply-input" placeholder={`Reply to ${activeStory.label}...`} />
                <div className="th-story-reactions">
                  <span>👍</span>
                  <span>❤️</span>
                  <span>😂</span>
                  <span>😮</span>
                  <span>😢</span>
                  <span>😡</span>
                </div>
              </div>
            </div>

            <div className="th-story-nav-btn d-none d-md-flex">
              <i className="bi bi-chevron-right"></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
