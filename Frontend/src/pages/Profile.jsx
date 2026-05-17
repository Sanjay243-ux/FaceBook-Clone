import React from 'react';
import PostCard from '../components/PostCard';
import { usePosts } from '../context/PostsContext';

export default function Profile() {
  const { posts } = usePosts();
  const profilePosts = posts.filter((p) => p.author === 'Tech Admin');

  return (
    <div className="th-layout" style={{ background: 'var(--primary-bg)' }}>
      <div className="th-profile-header-wrap">
        <div className="container" style={{ maxWidth: '1095px', padding: 0 }}>
          <div className="th-cover-photo-container">
            <div className="th-cover-photo" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop)' }}>
              <button type="button" className="th-edit-cover-btn">
                <i className="bi bi-camera-fill"></i> <span className="d-none d-sm-inline">Edit cover photo</span>
              </button>
            </div>
          </div>

          <div className="th-profile-info-container">
            <div className="th-profile-avatar-wrapper">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="User" className="th-profile-avatar-large" />
              <button type="button" className="th-edit-avatar-btn">
                <i className="bi bi-camera-fill"></i>
              </button>
            </div>

            <div className="th-profile-details">
              <div className="th-profile-name-area">
                <h1 className="th-profile-name-large">Tech Admin</h1>
                <div className="th-profile-friends-count">1.2K friends</div>
                <div className="th-profile-friends-avatars">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jack" alt="Friend" />
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Friend" />
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" alt="Friend" />
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" alt="Friend" />
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Friend" />
                </div>
              </div>

              <div className="th-profile-actions">
                <button type="button" className="th-btn-primary" style={{ padding: '8px 12px' }}>
                  <i className="bi bi-plus-circle-fill me-1"></i> Add to story
                </button>
                <button type="button" className="th-btn-secondary" style={{ padding: '8px 12px' }}>
                  <i className="bi bi-pencil-fill me-1"></i> Edit profile
                </button>
                <button type="button" className="th-btn-secondary px-3" style={{ padding: '8px 12px' }}>
                  <i className="bi bi-chevron-down"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="th-divider"></div>

          <div className="th-profile-nav">
            <button type="button" className="th-profile-nav-btn active">
              Posts
            </button>
            <button type="button" className="th-profile-nav-btn">
              About
            </button>
            <button type="button" className="th-profile-nav-btn">
              Friends
            </button>
            <button type="button" className="th-profile-nav-btn">
              Photos
            </button>
            <button type="button" className="th-profile-nav-btn">
              Videos
            </button>
            <button type="button" className="th-profile-nav-btn">
              Reels
            </button>
            <button type="button" className="th-profile-nav-btn">
              More <i className="bi bi-caret-down-fill ms-1"></i>
            </button>
            <div style={{ flex: 1 }}></div>
            <button type="button" className="th-btn-secondary px-3" style={{ padding: '8px 12px' }}>
              <i className="bi bi-three-dots"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="th-profile-content-wrap">
        <div className="container" style={{ maxWidth: '1095px', padding: 0 }}>
          <div className="row mt-3">
            <div className="col-lg-5 col-12 mb-3">
              <div className="th-card th-intro-card mb-3">
                <h3 className="th-card-title">Intro</h3>
                <div className="th-intro-bio">Building the future of social tech. #react #developer</div>
                <button type="button" className="th-btn-secondary w-100 mb-3" style={{ padding: '8px' }}>
                  Edit bio
                </button>

                <div className="th-intro-item">
                  <i className="bi bi-briefcase-fill text-muted"></i>
                  <span>
                    Software Engineer at <strong>TechHub</strong>
                  </span>
                </div>
                <div className="th-intro-item">
                  <i className="bi bi-mortarboard-fill text-muted"></i>
                  <span>
                    Studied Computer Science at <strong>University of Tech</strong>
                  </span>
                </div>
                <div className="th-intro-item">
                  <i className="bi bi-house-door-fill text-muted"></i>
                  <span>
                    Lives in <strong>San Francisco, California</strong>
                  </span>
                </div>
                <div className="th-intro-item">
                  <i className="bi bi-geo-alt-fill text-muted"></i>
                  <span>
                    From <strong>New York, New York</strong>
                  </span>
                </div>
                <div className="th-intro-item">
                  <i className="bi bi-heart-fill text-muted"></i>
                  <span>Single</span>
                </div>
                <button type="button" className="th-btn-secondary w-100 mt-3" style={{ padding: '8px' }}>
                  Edit details
                </button>
                <button type="button" className="th-btn-secondary w-100 mt-2" style={{ padding: '8px' }}>
                  Add hobbies
                </button>
                <button type="button" className="th-btn-secondary w-100 mt-2" style={{ padding: '8px' }}>
                  Add featured
                </button>
              </div>

              <div className="th-card th-intro-card mb-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="th-card-title mb-0">Photos</h3>
                  <button type="button" className="btn btn-link text-decoration-none p-0" style={{ color: 'var(--accent-blue)' }}>
                    See all photos
                  </button>
                </div>
                <div className="th-photos-grid">
                  <div className="th-photo-grid-item" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085)' }}></div>
                  <div className="th-photo-grid-item" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504639725590-34d0984388bd)' }}></div>
                  <div className="th-photo-grid-item" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1555066931-4365d14bab8c)' }}></div>
                  <div className="th-photo-grid-item" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517694712202-14dd9538aa97)' }}></div>
                  <div className="th-photo-grid-item" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551033406-611cf9a28f67)' }}></div>
                  <div className="th-photo-grid-item" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5)' }}></div>
                </div>
              </div>

              <div className="th-card th-intro-card">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <div>
                    <h3 className="th-card-title mb-0">Friends</h3>
                    <div className="text-muted" style={{ fontSize: '0.9375rem' }}>
                      1,245 friends
                    </div>
                  </div>
                  <button type="button" className="btn btn-link text-decoration-none p-0" style={{ color: 'var(--accent-blue)' }}>
                    See all friends
                  </button>
                </div>
                <div className="th-friends-grid mt-3">
                  {[
                    { name: 'Jack', seed: 'Jack' },
                    { name: 'Sarah', seed: 'Sarah' },
                    { name: 'Mike', seed: 'Mike' },
                    { name: 'Emma', seed: 'Emma' },
                    { name: 'John', seed: 'John' },
                    { name: 'Lisa', seed: 'Lisa' },
                  ].map((f, i) => (
                    <div key={i} className="th-friend-grid-item">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${f.seed}`} alt={f.name} />
                      <div className="th-friend-grid-name">{f.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-7 col-12">
              <div className="th-card th-create-post-card mb-3">
                <div className="th-create-post-top">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="User" className="th-create-avatar" />
                  <input type="text" className="th-create-input" placeholder="What's on your mind?" readOnly />
                </div>
                <div className="th-create-divider"></div>
                <div className="th-create-actions">
                  <button type="button" className="th-create-action-btn">
                    <i className="bi bi-camera-video-fill text-danger"></i> Live video
                  </button>
                  <button type="button" className="th-create-action-btn">
                    <i className="bi bi-images text-success"></i> Photo/video
                  </button>
                  <button type="button" className="th-create-action-btn d-none d-sm-flex">
                    <i className="bi bi-flag-fill" style={{ color: 'var(--accent-cyan)' }}></i> Life event
                  </button>
                </div>
              </div>

              <div className="th-card p-3 d-flex justify-content-between align-items-center mb-3">
                <h3 className="th-card-title mb-0" style={{ fontSize: '1.25rem' }}>
                  Posts
                </h3>
                <div className="d-flex gap-2">
                  <button type="button" className="th-btn-secondary" style={{ padding: '6px 12px' }}>
                    <i className="bi bi-sliders"></i> Filters
                  </button>
                  <button type="button" className="th-btn-secondary" style={{ padding: '6px 12px' }}>
                    <i className="bi bi-gear-fill"></i> Manage posts
                  </button>
                </div>
              </div>

              {profilePosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
