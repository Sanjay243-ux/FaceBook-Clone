import { createContext, useContext, useMemo, useState } from 'react';
import { INITIAL_POSTS } from '../data/postsSeed';

const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(INITIAL_POSTS);

  const addPost = (draft) => {
    const id = Date.now();
    const bodyText = draft.body.trim();
    const newPost = {
      id,
      type: 'Tech News',
      author: 'Tech Admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
      timestamp: 'Just now',
      title: draft.title.trim() || 'New post',
      body: bodyText.length > 220 ? `${bodyText.slice(0, 220)}…` : bodyText,
      fullBody: bodyText,
      reactions: 0,
      comments: 0,
      shares: 0,
      category: draft.category || 'News',
      userPost: true,
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const value = useMemo(() => ({ posts, addPost }), [posts]);

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
}

/** @returns {{ posts: typeof INITIAL_POSTS, addPost: function }} */
// eslint-disable-next-line react-refresh/only-export-components -- context hook exported next to Provider
export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error('usePosts must be used within PostsProvider');
  return ctx;
}
