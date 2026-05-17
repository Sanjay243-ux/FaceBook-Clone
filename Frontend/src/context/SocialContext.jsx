import { createContext, useContext, useState, useMemo, useCallback } from 'react';

const SocialContext = createContext(null);

const CURRENT_USER = {
  name: 'Tech Admin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
};

export function SocialProvider({ children }) {
  /* ── Follow state ─────────────────────────── */
  const [following, setFollowing] = useState(new Set());

  const toggleFollow = useCallback((name) => {
    setFollowing((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }, []);

  const isFollowing = useCallback((name) => following.has(name), [following]);

  /* ── Toast notifications ──────────────────── */
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  /* ── Notification items ───────────────────── */
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((text, icon = 'bi-bell-fill', color = '#2374e1') => {
    setNotifications((prev) => [
      {
        id: Date.now() + Math.random(),
        text,
        time: 'Just now',
        read: false,
        icon,
        color,
      },
      ...prev,
    ]);
  }, []);

  /* ── Memo-ised value ──────────────────────── */
  const value = useMemo(
    () => ({
      currentUser: CURRENT_USER,
      following,
      toggleFollow,
      isFollowing,
      toasts,
      addToast,
      notifications,
      addNotification,
    }),
    [following, toggleFollow, isFollowing, toasts, addToast, notifications, addNotification],
  );

  return <SocialContext.Provider value={value}>{children}</SocialContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSocial() {
  const ctx = useContext(SocialContext);
  if (!ctx) throw new Error('useSocial must be used within SocialProvider');
  return ctx;
}
