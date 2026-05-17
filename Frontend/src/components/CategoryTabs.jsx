export default function CategoryTabs({ activeCategory, setActiveCategory }) {
  const categories = ['All', 'News', 'Guides', 'Tutorials', 'Videos'];
  return (
    <div className="th-card th-tabs-wrap" id="category-tabs">
      <div className="th-tabs">
        {categories.map(cat => (
          <button key={cat} className={`th-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)} id={`tab-${cat.toLowerCase()}`}>
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
