import { useState } from 'react';

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [reactions, setReactions] = useState(post.reactions);
  const [expanded, setExpanded] = useState(false);

  const badgeStyles = {
    'Tech News': { background: 'var(--badge-news)', color: '#fff' },
    'Troubleshooting Guide': { background: 'var(--badge-guide)', color: '#000' },
    'Tutorial': { background: 'var(--badge-tutorial)', color: '#fff' },
  };
  const badge = badgeStyles[post.type] || { background: 'var(--accent-blue)', color: '#fff' };

  const handleLike = () => { setLiked(!liked); setReactions(p => liked ? p - 1 : p + 1); };

  return (
    <div className="th-card th-post" id={`post-${post.id}`}>
      <div className="th-post-inner">
        {/* Header */}
        <div className="th-post-header">
          <img src={post.avatar} alt={post.author} className="th-post-avatar" />
          <div className="th-post-meta">
            <div className="th-post-author-row">
              <span className="th-post-author">{post.author}</span>
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
              <button className="th-code-copy"><i className="bi bi-clipboard me-1"></i>Copy</button>
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
        <span className="th-reaction-count">{post.comments} comments · {post.shares || 0} shares</span>
      </div>

      {/* Action Buttons */}
      <div className="th-action-row">
        <button className={`th-action-btn ${liked ? 'liked' : ''}`} onClick={handleLike} id={`like-${post.id}`}>
          <i className={`bi ${liked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'}`}></i> Like
        </button>
        <button className="th-action-btn" id={`comment-${post.id}`}>
          <i className="bi bi-chat-dots"></i> Comment
        </button>
        <button className="th-action-btn" id={`share-${post.id}`}>
          <i className="bi bi-share"></i> Share
        </button>
      </div>
    </div>
  );
}
