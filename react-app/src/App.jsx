import { useState, useEffect } from 'react';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import CreatePost from './components/CreatePost';
import StoryBar from './components/StoryBar';
import CategoryTabs from './components/CategoryTabs';
import Feed from './components/Feed';
import RightSidebar from './components/RightSidebar';

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

      <div className="th-layout">
        <div className="container-fluid">
          <div className="row justify-content-center">
            {/* Left Sidebar */}
            <div className="col-lg-3 d-none d-lg-block p-0">
              <LeftSidebar />
            </div>

            {/* Main Feed */}
            <div className="col-lg-6 col-md-8 th-main-col" style={{ padding: '16px 12px', paddingTop: 16 }}>
              <CreatePost />
              <StoryBar />
              <CategoryTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
              <Feed activeCategory={activeCategory} searchQuery={searchQuery} />
            </div>

            {/* Right Sidebar */}
            <div className="col-lg-3 d-none d-lg-block p-0">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}