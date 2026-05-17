import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { usePosts } from '../context/PostsContext';

export default function Feed({ activeCategory, searchQuery }) {
  const { posts, fetchPosts, loading } = usePosts();
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    fetchPosts(activeCategory, searchQuery);
  }, [activeCategory, searchQuery, fetchPosts]);

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, '');
    if (!raw.startsWith('post-')) return;
    requestAnimationFrame(() => {
      document.getElementById(raw)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }, []);

  const filtered = posts.filter((post) => {
    const matchesCat = activeCategory === 'All' || post.category === activeCategory;
    const q = (searchQuery || '').toLowerCase();
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.body.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const visible = filtered.slice(0, visibleCount);

  return (
    <div id="feed-container">
      {visible.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {!loading && visible.length === 0 && (
        <div className="th-card" style={{ textAlign: 'center', padding: 40 }}>
          <i className="bi bi-search" style={{ fontSize: '2rem', color: 'var(--text-muted)' }}></i>
          <p style={{ color: 'var(--text-muted)', marginTop: 12 }}>No posts found matching your criteria.</p>
        </div>
      )}

      {loading && (
        <div className="th-card" style={{ textAlign: 'center', padding: 40 }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {visibleCount < filtered.length && (
        <div className="th-load-more">
          <button type="button" onClick={() => setVisibleCount((prev) => prev + 3)} id="load-more-btn">
            <i className="bi bi-arrow-down-circle me-2"></i>Load More Posts
          </button>
        </div>
      )}
    </div>
  );
}
