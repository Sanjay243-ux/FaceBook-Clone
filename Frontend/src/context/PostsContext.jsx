import { createContext, useContext, useMemo, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, user } = useAuth();

  const fetchPosts = useCallback(async (category = 'All', search = '') => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (category !== 'All') queryParams.append('category', category);
      if (search) queryParams.append('search', search);

      const response = await fetch(`http://localhost:5000/api/posts?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      
      const formattedPosts = data.posts.map(p => ({
        id: p.id,
        type: p.category,
        author: p.author ? `${p.author.first_name} ${p.author.last_name}` : 'Unknown',
        avatar: p.author?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Unknown',
        timestamp: new Date(p.created_at).toLocaleString(),
        title: p.title || '',
        body: p.body.length > 220 ? `${p.body.slice(0, 220)}…` : p.body,
        fullBody: p.body,
        reactions: p.reactions_count,
        comments: p.comments_count,
        shares: 0,
        category: p.category,
        image_url: p.image_url,
        userPost: p.user_id === user?.id,
      }));
      setPosts(formattedPosts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPosts();
  }, [fetchPosts]);

  const addPost = useCallback(async (draft) => {
    if (!token) return;
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: draft.title,
          body: draft.body,
          category: draft.category || 'News',
          image_url: draft.image_url
        })
      });
      if (response.ok) {
        fetchPosts(); // Refresh posts
      }
    } catch (err) {
      console.error('Failed to create post', err);
    }
  }, [token, fetchPosts]);

  const value = useMemo(() => ({ posts, addPost, fetchPosts, loading }), [posts, loading, fetchPosts, addPost]);

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error('usePosts must be used within PostsProvider');
  return ctx;
}
