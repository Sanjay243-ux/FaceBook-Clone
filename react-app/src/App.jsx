import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import News from './pages/News';
import Guides from './pages/Guides';
import Videos from './pages/Videos';
import Groups from './pages/Groups';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Messenger from './pages/Messenger';
import Notifications from './pages/Notifications';
import Menu from './pages/Menu';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div id="techhub-app">
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Routes>
        <Route path="/" element={<Home activeCategory={activeCategory} setActiveCategory={setActiveCategory} searchQuery={searchQuery} />} />
        <Route path="/news" element={<News />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/messenger" element={<Messenger />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </div>
  );
}