import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocial } from '../context/SocialContext';

/**
 * Self-contained Like / Comment / Share action bar.
 * Drop into any card that needs interactive social buttons.
 *
 * Props:
 *   - itemId     (string|number)  unique key for the item
 *   - itemTitle  (string)         used in toast/notification messages
 *   - initialLikes    (number)    starting like count (default 0)
 *   - initialComments (number)    starting comment count (default 0)
 */
export default function ActionBar({ itemId, itemTitle = 'this post', initialLikes = 0, initialComments = 0 }) {
  const navigate = useNavigate();
  const { currentUser, addToast } = useSocial();

  /* Like */
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);

  /* Comment */
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(initialComments);

  /* Share */
  const [shareCount, setShareCount] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleLike = () => {
    setLiked((l) => !l);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: currentUser.name,
        avatar: currentUser.avatar,
        text: commentText.trim(),
        time: 'Just now',
        liked: false,
      },
    ]);
    setCommentCount((c) => c + 1);
    setCommentText('');
  };

  const toggleCommentLike = (id) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, liked: !c.liked } : c)),
    );
  };

  const handleShare = (method) => {
    setShareCount((s) => s + 1);
    setShowShareModal(false);
    addToast(`Shared "${itemTitle}" ${method}`, 'success');
  };

  const handleCopyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#item-${itemId}`;
    try { await navigator.clipboard.writeText(url); } catch { /* noop */ }
    setShowShareModal(false);
    addToast('Link copied to clipboard!', 'success');
  };

  return (
    <>
      {/* Counts summary */}
      <div className="th-reaction-row" style={{ padding: '8px 16px' }}>
        <div className="th-reaction-left">
          {likeCount > 0 && (
            <>
              <div className="th-reaction-emojis">
                <span style={{ background: '#2374e1' }}>👍</span>
                <span style={{ background: '#f33e58' }}>❤️</span>
              </div>
              <span className="th-reaction-count">{likeCount.toLocaleString()}</span>
            </>
          )}
        </div>
        <span className="th-reaction-count" style={{ cursor: 'pointer' }} onClick={() => setShowComments(!showComments)}>
          {commentCount > 0 && `${commentCount} comments`}{commentCount > 0 && shareCount > 0 && ' · '}{shareCount > 0 && `${shareCount} shares`}
        </span>
      </div>

      {/* Action buttons */}
      <div className="th-action-row" style={{ borderTop: '1px solid var(--border-color)' }}>
        <button className={`th-action-btn ${liked ? 'liked' : ''}`} onClick={handleLike} id={`like-ab-${itemId}`}>
          <i className={`bi ${liked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'}`}></i> Like
        </button>
        <button className="th-action-btn" onClick={() => setShowComments(!showComments)} id={`comment-ab-${itemId}`}>
          <i className="bi bi-chat-dots"></i> Comment
        </button>
        <button className="th-action-btn" onClick={() => setShowShareModal(true)} id={`share-ab-${itemId}`}>
          <i className="bi bi-share"></i> Share
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-color)', background: 'var(--primary-bg)' }}>
          <div className="d-flex align-items-center mb-3">
            <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>Most Relevant</span>
            <i className="bi bi-caret-down-fill ms-1" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}></i>
          </div>

          {comments.map((comment) => (
            <div key={comment.id} className="d-flex gap-2 mb-3">
              <img
                src={comment.avatar}
                alt={comment.author}
                style={{ width: 32, height: 32, borderRadius: '50%', cursor: 'pointer' }}
                onClick={() => navigate('/profile')}
              />
              <div>
                <div style={{ background: 'var(--elevated-bg)', padding: '8px 12px', borderRadius: 18, display: 'inline-block' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text-primary)', cursor: 'pointer' }}
                    onClick={() => navigate('/profile')}
                    onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
                    onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
                  >
                    {comment.author}
                  </div>
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

          {/* Comment input */}
          <div className="d-flex gap-2 mt-2">
            <img src={currentUser.avatar} alt="You" style={{ width: 32, height: 32, borderRadius: '50%' }} />
            <div className="flex-fill d-flex align-items-center" style={{ background: 'var(--elevated-bg)', borderRadius: 20, padding: '4px 12px' }}>
              <form onSubmit={submitComment} className="flex-fill d-flex align-items-center">
                <input
                  type="text"
                  placeholder="Write a comment…"
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

      {/* Share modal */}
      {showShareModal && (
        <div className="th-create-post-overlay" style={{ zIndex: 3000 }} onClick={() => setShowShareModal(false)}>
          <div className="th-create-post-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <div className="th-create-post-header">
              <h3 className="mb-0 text-center w-100" style={{ fontSize: '1.25rem', fontWeight: 700 }}>Share</h3>
              <button type="button" className="th-close-modal-btn" onClick={() => setShowShareModal(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="th-divider" style={{ margin: 0 }}></div>
            <div className="th-create-post-body p-2">
              {[
                { icon: 'bi-arrow-90deg-right', label: 'Share now (Public)', method: 'publicly' },
                { icon: 'bi-pencil-square', label: 'Share to Feed', method: 'to your feed' },
                { icon: 'bi-send-fill', label: 'Send in Messenger', method: 'via Messenger' },
                { icon: 'bi-people-fill', label: 'Share to a group', method: 'to a group' },
              ].map((opt) => (
                <button
                  key={opt.method}
                  type="button"
                  className="th-sidebar-link w-100 d-flex align-items-center gap-3 px-3 py-2"
                  onClick={() => handleShare(opt.method)}
                  style={{ background: 'transparent', border: 'none' }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--elevated-bg)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                    <i className={`bi ${opt.icon}`}></i>
                  </div>
                  <div className="text-start">
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{opt.label}</div>
                  </div>
                </button>
              ))}

              <button
                type="button"
                className="th-sidebar-link w-100 d-flex align-items-center gap-3 px-3 py-2 border-top mt-1 pt-3"
                onClick={handleCopyLink}
                style={{ background: 'transparent', border: 'none', borderRadius: 0, borderColor: 'var(--border-color)' }}
              >
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--elevated-bg)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
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
