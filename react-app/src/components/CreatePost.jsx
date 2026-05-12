import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';

export default function CreatePost() {
  const navigate = useNavigate();
  const { addPost } = usePosts();
  const [showModal, setShowModal] = useState(false);
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('News');

  const resetAndClose = () => {
    setBody('');
    setCategory('News');
    setShowModal(false);
  };

  const handleSubmit = () => {
    const text = body.trim();
    if (!text) return;
    const firstLine = text.split('\n')[0]?.trim() || 'New post';
    const title = firstLine.length > 120 ? `${firstLine.slice(0, 117)}…` : firstLine;
    addPost({ title, body: text, category });
    resetAndClose();
  };

  return (
    <>
      <div className="th-card th-create-post-card" id="create-post-box">
        <div className="th-card-body">
          <div className="th-create-post-top">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
              alt="User"
              className="th-create-avatar"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/profile')}
            />
            <input
              type="text"
              className="th-create-input"
              placeholder="What's on your mind?"
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
            <button type="button" className="th-create-action-btn" id="btn-photo" onClick={() => setShowModal(true)}>
              <i className="bi bi-image-fill" style={{ color: '#45bd62' }}></i>
              <span className="d-none d-sm-inline">Photo/video</span>
            </button>
            <button type="button" className="th-create-action-btn" id="btn-code" onClick={() => setShowModal(true)}>
              <i className="bi bi-flag-fill" style={{ color: 'var(--accent-cyan)' }}></i>
              <span className="d-none d-sm-inline">Life event</span>
            </button>
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
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="User" className="th-create-avatar" />
                <div className="flex-grow-1">
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Tech Admin</div>
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
                placeholder="What's on your mind, Tech Admin?"
                autoFocus
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />

              <div className="th-post-add-to-post">
                <span style={{ fontWeight: 600 }}>Add to your post</span>
                <div className="d-flex gap-3">
                  <i className="bi bi-images" style={{ color: '#45bd62', fontSize: '1.5rem', cursor: 'pointer' }}></i>
                  <i className="bi bi-person-fill-add" style={{ color: '#1877f2', fontSize: '1.5rem', cursor: 'pointer' }}></i>
                  <i className="bi bi-emoji-smile" style={{ color: '#f7b928', fontSize: '1.5rem', cursor: 'pointer' }}></i>
                  <i className="bi bi-geo-alt-fill" style={{ color: '#f5533d', fontSize: '1.5rem', cursor: 'pointer' }}></i>
                  <i className="bi bi-three-dots" style={{ color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}></i>
                </div>
              </div>

              <button
                type="button"
                className="th-btn-primary w-100 mt-3"
                style={{ padding: '10px', opacity: body.trim() ? 1 : 0.5 }}
                disabled={!body.trim()}
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
