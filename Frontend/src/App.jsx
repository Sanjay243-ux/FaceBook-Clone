import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import News from './pages/News';
import Guides from './pages/Guides';
import Videos from './pages/Videos';
import Groups from './pages/Groups';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Notifications from './pages/Notifications';
import Menu from './pages/Menu';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ToastContainer from './components/ToastContainer';
import { PostsProvider } from './context/PostsContext';
import { SocialProvider } from './context/SocialContext';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();
  if (loading) return null;
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <SocialProvider>
    <PostsProvider>
    <div id="techhub-app">
      {!isAuthPage && (
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<ProtectedRoute><Home activeCategory={activeCategory} setActiveCategory={setActiveCategory} searchQuery={searchQuery} /></ProtectedRoute>} />
        <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
        <Route path="/guides" element={<ProtectedRoute><Guides /></ProtectedRoute>} />
        <Route path="/videos" element={<ProtectedRoute><Videos /></ProtectedRoute>} />
        <Route path="/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
      </Routes>

      <ToastContainer />
    </div>
    </PostsProvider>
    </SocialProvider>
  );
}