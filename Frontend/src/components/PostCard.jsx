import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocial } from '../context/SocialContext';

function stripCodeHtml(html) {
  if (!html) return '';
  const el = document.createElement('div');
  el.innerHTML = html;
  return el.textContent || '';
}

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const { currentUser, addToast } = useSocial();
  const [liked, setLiked] = useState(false);
  const [reactions, setReactions] = useState(post.reactions || 0);
  const [expanded, setExpanded] = useState(false);
  
  // Comment & Share State
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState(post.mockComments || []);
  const [commentCount, setCommentCount] = useState(post.comments || 0);
  const [shareCount, setShareCount] = useState(post.shares || 0);
  const [showShareModal, setShowShareModal] = useState(false);

  const badgeStyles = {
    'Tech News': { background: 'var(--badge-news)', color: '#fff' },
    'Troubleshooting Guide': { background: 'var(--badge-guide)', color: '#000' },
    Tutorial: { background: 'var(--badge-tutorial)', color: '#fff' },
    Video: { background: '#a855f7', color: '#fff' },
  };
  const badge = badgeStyles[post.type] || { background: 'var(--accent-blue)', color: '#fff' };

  const handleLike = () => { setLiked(!liked); setReactions(p => liked ? p - 1 : p + 1); };

  const submitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      author: currentUser.name,
      avatar: currentUser.avatar,
      text: commentText,
      time: 'Just now',
      liked: false,
    };
    
    setCommentsList([...commentsList, newComment]);
    setCommentCount(c => c + 1);
    setCommentText('');
  };

  const toggleCommentLike = (id) => {
    setCommentsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, liked: !c.liked } : c)),
    );
  };

  const handleShare = (method) => {
    setShareCount((s) => s + 1);
    setShowShareModal(false);
    addToast(`Shared "${post.title}" ${method}`, 'success');
  };

  const handleCopyPostLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#post-${post.id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* ignore */
    }
    setShowShareModal(false);
    addToast('Link copied to clipboard!', 'success');
  };

  const copyCode = async () => {
    const text = stripCodeHtml(post.codeBlock);
    try {
      await navigator.clipboard.writeText(text);
      addToast('Code copied to clipboard!', 'success');
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <div className="th-card th-post" id={`post-${post.id}`}>
        <div className="th-post-inner">
          {/* Header */}
          <div className="th-post-header">
            <img src={post.avatar} alt={post.author} className="th-post-avatar" style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')} />
            <div className="th-post-meta">
              <div className="th-post-author-row">
                <span className="th-post-author" style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')} onMouseOver={e => e.target.style.textDecoration = 'underline'} onMouseOut={e => e.target.style.textDecoration = 'none'}>{post.author}</span>
                <span className="th-post-badge" style={badge}>{post.type}</span>
              </div>
              <div className="th-post-timestamp">
                {post.timestamp} · <i className="bi bi-globe2" style={{ fontSize: '.7rem' }}></i>
              </div>
            </div>
            <button className="th-post-menu"><i className="bi bi-three-dots"></i></button>
          </div>

          {/* Content */}
          <h4 className="th-post-title">{post.title}</h4>
          <p className="th-post-body">
            {expanded ? post.fullBody || post.body : post.body}
            {post.fullBody && !expanded && <button className="th-read-more" onClick={() => setExpanded(true)}> See more</button>}
            {expanded && post.fullBody && <button className="th-read-more" onClick={() => setExpanded(false)}> See less</button>}
          </p>

          {/* Code Block */}
          {post.codeBlock && (
            <div className="th-code-block">
              <div className="th-code-header">
                <span className="th-code-lang">{post.codeLang || 'javascript'}</span>
                <button type="button" className="th-code-copy" onClick={copyCode}>
                  <i className="bi bi-clipboard me-1"></i>Copy
                </button>
              </div>
              <div className="th-code-body"><pre style={{ margin: 0 }}><code dangerouslySetInnerHTML={{ __html: post.codeBlock }} /></pre></div>
            </div>
          )}
        </div>

        {/* Post Image — full width */}
        {post.image && <img src={post.image} alt={post.title} className="th-post-image" style={{ width: '100%', maxHeight: 500, objectFit: 'cover' }} />}

        {/* Reaction Summary */}
        <div className="th-reaction-row">
          <div className="th-reaction-left">
            <div className="th-reaction-emojis">
              <span style={{ background: '#2374e1' }}>👍</span>
              <span style={{ background: '#f33e58' }}>❤️</span>
              <span style={{ background: '#f7b928' }}>💡</span>
            </div>
            <span className="th-reaction-count">{reactions.toLocaleString()}</span>
          </div>
          <span className="th-reaction-count" style={{ cursor: 'pointer' }} onClick={() => setShowComments(!showComments)}>
            {commentCount} comments · {shareCount} shares
          </span>
        </div>

        {/* Action Buttons */}
        <div className="th-action-row">
          <button className={`th-action-btn ${liked ? 'liked' : ''}`} onClick={handleLike} id={`like-${post.id}`}>
            <i className={`bi ${liked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'}`}></i> Like
          </button>
          <button className="th-action-btn" id={`comment-${post.id}`} onClick={() => setShowComments(!showComments)}>
            <i className="bi bi-chat-dots"></i> Comment
          </button>
          <button className="th-action-btn" id={`share-${post.id}`} onClick={() => setShowShareModal(true)}>
            <i className="bi bi-share"></i> Share
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="th-comments-section" style={{ padding: '12px 16px', borderTop: '1px solid var(--border-color)', background: 'var(--primary-bg)' }}>
            <div className="d-flex align-items-center mb-3">
              <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>Most Relevant</span>
              <i className="bi bi-caret-down-fill ms-1" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}></i>
            </div>
            
            {/* Existing Comments */}
            {commentsList.map(comment => (
              <div key={comment.id} className="d-flex gap-2 mb-3">
                <img src={comment.avatar} alt={comment.author} style={{ width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer' }} onClick={() => navigate('/profile')} />
                <div>
                  <div style={{ background: 'var(--elevated-bg)', padding: '8px 12px', borderRadius: '18px', display: 'inline-block' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text-primary)', cursor: 'pointer' }} onClick={() => navigate('/profile')} onMouseOver={e => e.target.style.textDecoration = 'underline'} onMouseOut={e => e.target.style.textDecoration = 'none'}>{comment.author}</div>
                    <div style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{comment.text}</div>
                  </div>
                  <div className="d-flex gap-3 mt-1 ms-2" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    <span
                      style={{ cursor: 'pointer', color: comment.liked ? 'var(--accent-blue)' : 'var(--text-muted)' }}
                      onClick={() => toggleCommentLike(comment.id)}
                    >
                      Like
                    </span>
                    <span style={{ cursor: 'pointer' }}>Reply</span>
                    <span style={{ fontWeight: 400 }}>{comment.time}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Comment Input */}
            <div className="d-flex gap-2 mt-3">
              <img src={currentUser.avatar} alt="User" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
              <div className="flex-fill d-flex align-items-center" style={{ background: 'var(--elevated-bg)', borderRadius: '20px', padding: '4px 12px' }}>
                <form onSubmit={submitComment} className="flex-fill d-flex align-items-center">
                  <input 
                    type="text" 
                    placeholder="Write a comment..." 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%', fontSize: '0.9375rem' }}
                  />
                  <button type="submit" style={{ background: 'transparent', border: 'none', color: commentText ? 'var(--accent-blue)' : 'var(--text-muted)', display: 'flex', cursor: commentText ? 'pointer' : 'default' }}>
                    <i className="bi bi-send-fill"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="th-create-post-overlay" style={{ zIndex: 3000 }} onClick={() => setShowShareModal(false)}>
          <div className="th-create-post-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <div className="th-create-post-header">
              <h3 className="mb-0 text-center w-100" style={{ fontSize: '1.25rem', fontWeight: 700 }}>Share</h3>
              <button type="button" className="th-close-modal-btn" onClick={() => setShowShareModal(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="th-divider" style={{ margin: 0 }}></div>
            
            <div className="th-create-post-body p-2">
              <button type="button" className="th-sidebar-link w-100 d-flex align-items-center gap-3 px-3 py-2" onClick={() => handleShare('publicly')} style={{ background: 'transparent', border: 'none' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--elevated-bg)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                  <i className="bi bi-arrow-90deg-right"></i>
                </div>
                <div className="text-start">
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Share now (Public)</div>
                </div>
              </button>

              <button type="button" className="th-sidebar-link w-100 d-flex align-items-center gap-3 px-3 py-2" onClick={() => handleShare('to your feed')} style={{ background: 'transparent', border: 'none' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--elevated-bg)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                  <i className="bi bi-pencil-square"></i>
                </div>
                <div className="text-start">
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Share to Feed</div>
                </div>
              </button>

              <button type="button" className="th-sidebar-link w-100 d-flex align-items-center gap-3 px-3 py-2" onClick={() => handleShare('via Messenger')} style={{ background: 'transparent', border: 'none' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--elevated-bg)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                  <i className="bi bi-send-fill"></i>
                </div>
                <div className="text-start">
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Send in Messenger</div>
                </div>
              </button>

              <button type="button" className="th-sidebar-link w-100 d-flex align-items-center gap-3 px-3 py-2" onClick={() => handleShare('to a group')} style={{ background: 'transparent', border: 'none' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--elevated-bg)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                  <i className="bi bi-people-fill"></i>
                </div>
                <div className="text-start">
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Share to a group</div>
                </div>
              </button>

              <button type="button" className="th-sidebar-link w-100 d-flex align-items-center gap-3 px-3 py-2 border-top mt-1 pt-3" onClick={() => handleCopyPostLink()} style={{ background: 'transparent', border: 'none', borderRadius: 0, borderColor: 'var(--border-color)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--elevated-bg)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                  <i className="bi bi-link-45deg"></i>
                </div>
                <div className="text-start">
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Copy link</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
