import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';
import { useAuth } from '../context/AuthContext';

export default function CreatePost() {
  const navigate = useNavigate();
  const { addPost } = usePosts();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('News');
  const [media, setMedia] = useState(null);
  const fileInputRef = useRef(null);

  const resetAndClose = () => {
    setBody('');
    setCategory('News');
    setMedia(null);
    setShowModal(false);
  };

  const handleSubmit = () => {
    const text = body.trim();
    if (!text && !media) return;
    const firstLine = text.split('\n')[0]?.trim() || 'New post';
    const title = firstLine.length > 120 ? `${firstLine.slice(0, 117)}…` : firstLine;
    addPost({ title, body: text, category, image_url: media });
    resetAndClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMedia(reader.result);
        setShowModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="th-card th-create-post-card" id="create-post-box">
        <div className="th-card-body">
          <div className="th-create-post-top">
            <img
              src={user?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Unknown"}
              alt="User"
              className="th-create-avatar"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/profile')}
            />
            <input
              type="text"
              className="th-create-input"
              placeholder={`What's on your mind, ${user?.first_name}?`}
              id="create-post-input"
              readOnly
              onClick={() => setShowModal(true)}
            />
          </div>
          <div className="th-create-divider"></div>
          <div className="th-create-actions">
            <button type="button" className="th-create-action-btn" id="btn-live-video" onClick={() => setShowModal(true)}>
              <i className="bi bi-camera-video-fill" style={{ color: '#f3425f' }}></i>
              <span className="d-none d-sm-inline">Live video</span>
            </button>
            <button type="button" className="th-create-action-btn" id="btn-photo" onClick={() => fileInputRef.current?.click()}>
              <i className="bi bi-image-fill" style={{ color: '#45bd62' }}></i>
              <span className="d-none d-sm-inline">Photo/video</span>
            </button>
            <button type="button" className="th-create-action-btn" id="btn-code" onClick={() => setShowModal(true)}>
              <i className="bi bi-flag-fill" style={{ color: 'var(--accent-cyan)' }}></i>
              <span className="d-none d-sm-inline">Life event</span>
            </button>
            <input type="file" accept="image/*,video/*" hidden ref={fileInputRef} onChange={handleFileChange} />
          </div>
        </div>
      </div>

      {showModal && (
        <div className="th-create-post-overlay">
          <div className="th-create-post-modal">
            <div className="th-create-post-header">
              <h3 className="mb-0 text-center w-100" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                Create post
              </h3>
              <button type="button" className="th-close-modal-btn" onClick={resetAndClose}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="th-divider" style={{ margin: 0 }}></div>

            <div className="th-create-post-body">
              <div className="d-flex align-items-center gap-2 mb-3">
                <img src={user?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Unknown"} alt="User" className="th-create-avatar" />
                <div className="flex-grow-1">
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{user ? `${user.first_name} ${user.last_name}` : 'User'}</div>
                  <div className="d-flex flex-wrap align-items-center gap-2 mt-1">
                    <button type="button" className="th-post-privacy-btn">
                      <i className="bi bi-globe2"></i> Public <i className="bi bi-caret-down-fill ms-1"></i>
                    </button>
                    <select
                      className="form-select form-select-sm"
                      style={{
                        maxWidth: 140,
                        fontSize: '0.8125rem',
                        background: 'var(--elevated-bg)',
                        color: 'var(--text-primary)',
                        borderColor: 'var(--border-color)',
                      }}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      aria-label="Post category"
                    >
                      <option value="News">News</option>
                      <option value="Guides">Guides</option>
                      <option value="Tutorials">Tutorials</option>
                      <option value="Videos">Videos</option>
                    </select>
                  </div>
                </div>
              </div>

              <textarea
                className="th-post-textarea"
                placeholder={`What's on your mind, ${user?.first_name}?`}
                autoFocus
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />

              {media && (
                <div className="position-relative mb-3" style={{ borderRadius: 8, overflow: 'hidden' }}>
                  <button 
                    type="button" 
                    className="btn-close bg-white position-absolute m-2 top-0 end-0" 
                    style={{ zIndex: 10, padding: 8, borderRadius: '50%' }}
                    onClick={() => setMedia(null)}
                  ></button>
                  {media.startsWith('data:video') ? (
                    <video src={media} controls className="w-100" style={{ maxHeight: 300, objectFit: 'contain', background: '#000' }} />
                  ) : (
                    <img src={media} alt="Upload preview" className="w-100" style={{ maxHeight: 300, objectFit: 'contain', background: '#000' }} />
                  )}
                </div>
              )}

              <div className="th-post-add-to-post">
                <span style={{ fontWeight: 600 }}>Add to your post</span>
                <div className="d-flex gap-3">
                  <i className="bi bi-images" style={{ color: '#45bd62', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => fileInputRef.current?.click()}></i>
                  <i className="bi bi-person-fill-add" style={{ color: '#1877f2', fontSize: '1.5rem', cursor: 'pointer' }}></i>
                  <i className="bi bi-emoji-smile" style={{ color: '#f7b928', fontSize: '1.5rem', cursor: 'pointer' }}></i>
                  <i className="bi bi-geo-alt-fill" style={{ color: '#f5533d', fontSize: '1.5rem', cursor: 'pointer' }}></i>
                  <i className="bi bi-three-dots" style={{ color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}></i>
                </div>
              </div>

              <button
                type="button"
                className="th-btn-primary w-100 mt-3"
                style={{ padding: '10px', opacity: (body.trim() || media) ? 1 : 0.5 }}
                disabled={!body.trim() && !media}
                onClick={handleSubmit}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
