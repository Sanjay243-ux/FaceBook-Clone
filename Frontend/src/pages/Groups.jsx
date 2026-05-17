import React, { useState } from 'react';
import ActionBar from '../components/ActionBar';
import { useSocial } from '../context/SocialContext';

export default function Groups() {
  const { addToast } = useSocial();
  const [joined, setJoined] = useState(() => new Set());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupPrivacy, setGroupPrivacy] = useState('public');

  const groups = [
    { id: 1, name: 'React Developers Global', members: '145K', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop', active: true, postAuthor: 'Alex Developer', postText: 'Does anyone have good resources for learning advanced React patterns? I\'m trying to wrap my head around custom hooks and context optimization. Thanks!' },
    { id: 2, name: 'UI/UX Design Inspiration', members: '82K', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop', active: false, postAuthor: 'Design Pro', postText: 'Just published my Figma design system template for 2026. It\'s free and includes dark mode tokens, accessibility presets, and responsive breakpoints!' },
    { id: 3, name: 'Cybersecurity Enthusiasts', members: '210K', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop', active: true, postAuthor: 'SecOps Daily', postText: 'Critical CVE discovered in popular npm packages. Over 400 libraries affected. Check your dependencies and update immediately!' },
  ];

  const toggleJoin = (id, name) => {
    const willJoin = !joined.has(id);
    setJoined((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    addToast(
      willJoin ? `You joined ${name}` : `You left ${name}`,
      willJoin ? 'success' : 'info',
    );
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) return;
    addToast(`Group "${groupName}" created successfully!`, 'success');
    setGroupName('');
    setGroupPrivacy('public');
    setShowCreateModal(false);
  };

  return (
    <div className="th-layout mt-3 mx-3">
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
              <button className="th-btn-primary w-100 mt-3" style={{ background: 'rgba(35, 116, 225, 0.1)', color: 'var(--accent-blue)' }} onClick={() => setShowCreateModal(true)}>
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
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {g.active ? 'Last active an hour ago' : 'Last active 3 days ago'}
                      {joined.has(g.id) && <span style={{ color: '#31a24c' }}> · Joined</span>}
                    </div>
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
                <div key={group.id} className="th-card mb-4 overflow-hidden" id={`item-group-${group.id}`}>
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
                      onClick={() => toggleJoin(group.id, group.name)}
                    >
                      {joined.has(group.id) ? (
                        <><i className="bi bi-check-lg me-1"></i>Joined</>
                      ) : (
                        <><i className="bi bi-plus-lg me-1"></i>Join</>
                      )}
                    </button>
                  </div>
                  
                  <div className="p-3">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="bi bi-person-fill"></i>
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{group.postAuthor} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>posted an update</span></div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>4 hrs</div>
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-primary)' }}>{group.postText}</p>
                  </div>
                  
                  <ActionBar
                    itemId={`group-${group.id}`}
                    itemTitle={`post in ${group.name}`}
                    initialLikes={0}
                    initialComments={0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="th-create-post-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="th-create-post-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="th-create-post-header">
              <h3 className="mb-0 text-center w-100" style={{ fontSize: '1.25rem', fontWeight: 700 }}>Create New Group</h3>
              <button type="button" className="th-close-modal-btn" onClick={() => setShowCreateModal(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="th-divider" style={{ margin: 0 }}></div>
            <div className="th-create-post-body p-3">
              <div className="mb-3">
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>Group Name</label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Enter group name..."
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--elevated-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.9375rem', outline: 'none' }}
                />
              </div>
              <div className="mb-3">
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>Privacy</label>
                <select
                  value={groupPrivacy}
                  onChange={(e) => setGroupPrivacy(e.target.value)}
                  className="form-select"
                  style={{ background: 'var(--elevated-bg)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <button
                type="button"
                className="th-btn-primary w-100"
                style={{ padding: '10px', opacity: groupName.trim() ? 1 : 0.5 }}
                disabled={!groupName.trim()}
                onClick={handleCreateGroup}
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
