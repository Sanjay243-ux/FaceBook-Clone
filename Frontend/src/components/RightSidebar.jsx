import { useState } from 'react';
import { useSocial } from '../context/SocialContext';

export default function RightSidebar() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { isFollowing, toggleFollow, addToast } = useSocial();

  const trending = [
    { topic: '#GeminiUltra', posts: '12.4K posts' },
    { topic: '#CyberAttack2026', posts: '8.9K posts' },
    { topic: '#ReactNative', posts: '6.2K posts' },
    { topic: '#QuantumComputing', posts: '4.8K posts' },
    { topic: '#RustLang', posts: '3.5K posts' },
  ];

  const suggested = [
    { name: 'AI Weekly', category: 'AI & Machine Learning', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AIWeekly' },
    { name: 'DevOps Daily', category: 'Cloud & DevOps', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=DevOps' },
    { name: 'CyberSec Hub', category: 'Security', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=CyberSec' },
  ];

  const events = [
    { month: 'MAY', day: '15', name: 'Google I/O 2026', location: 'Mountain View, CA' },
    { month: 'JUN', day: '9', name: 'WWDC 2026', location: 'Apple Park, Cupertino' },
    { month: 'JUL', day: '20', name: 'AWS re:Invent', location: 'Las Vegas, NV' },
  ];

  const handleFollow = (name) => {
    const willFollow = !isFollowing(name);
    toggleFollow(name);
    addToast(
      willFollow ? `You are now following ${name}` : `You unfollowed ${name}`,
      willFollow ? 'success' : 'info',
    );
  };

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      addToast('Successfully subscribed to the newsletter!', 'success');
    }
  };

  return (
    <div className="th-sidebar" id="right-sidebar">
      {/* Sponsored / Ad space */}
      <div style={{ padding: '16px 16px 8px', fontSize: '.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>
        Sponsored
      </div>
      <div style={{ padding: '0 16px 12px' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer', padding: '6px 0' }}>
          <div style={{ width: 130, height: 130, borderRadius: 8, background: 'linear-gradient(135deg, #1a1a2e, #16213e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=130&h=130&fit=crop" alt="ad" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
          </div>
          <div>
            <div style={{ fontSize: '.875rem', fontWeight: 600 }}>Learn to Code Today</div>
            <div style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}>codecademy.com</div>
          </div>
        </div>
      </div>

      <div className="th-divider"></div>

      {/* Trending */}
      <div className="th-card" style={{ margin: '8px 0', border: 'none', boxShadow: 'none', background: 'transparent' }} id="trending-widget">
        <div className="th-widget-header">
          <span><i className="bi bi-fire th-widget-header-icon" style={{ color: '#f3425f' }}></i>Trending in Tech</span>
          <button className="th-widget-see-all">See all</button>
        </div>
        {trending.map((t, i) => (
          <div key={i} className="th-trending-item">
            <div className="th-trending-num">{i + 1}</div>
            <div>
              <div className="th-trending-text">{t.topic}</div>
              <div className="th-trending-count">{t.posts}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="th-divider"></div>

      {/* Suggested Pages */}
      <div className="th-card" style={{ margin: '8px 0', border: 'none', boxShadow: 'none', background: 'transparent' }} id="suggested-widget">
        <div className="th-widget-header">
          <span><i className="bi bi-people-fill th-widget-header-icon" style={{ color: 'var(--accent-blue)' }}></i>Suggested for you</span>
          <button className="th-widget-see-all">See all</button>
        </div>
        {suggested.map((s, i) => (
          <div key={i} className="th-suggested-item">
            <img src={s.avatar} alt={s.name} className="th-suggested-avatar" />
            <div className="th-suggested-info">
              <div className="th-suggested-name">{s.name}</div>
              <div className="th-suggested-cat">{s.category}</div>
            </div>
            <button
              className={`th-follow-btn ${isFollowing(s.name) ? 'following' : ''}`}
              onClick={() => handleFollow(s.name)}
              id={`follow-${s.name.replace(/\s/g, '-')}`}
            >
              {isFollowing(s.name) ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>

      <div className="th-divider"></div>

      {/* Upcoming Events */}
      <div style={{ padding: '8px 0' }} id="events-widget">
        <div className="th-widget-header">
          <span><i className="bi bi-calendar-event-fill th-widget-header-icon" style={{ color: '#f7b928' }}></i>Upcoming Events</span>
        </div>
        {events.map((e, i) => (
          <div key={i} className="th-event-item">
            <div className="th-event-date-box">
              <div className="th-event-date-month">{e.month}</div>
              <div className="th-event-date-day">{e.day}</div>
            </div>
            <div>
              <div className="th-event-name">{e.name}</div>
              <div className="th-event-loc"><i className="bi bi-geo-alt me-1"></i>{e.location}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div className="th-newsletter" id="newsletter-widget">
        <h5><i className="bi bi-envelope-paper-fill me-2"></i>Tech Newsletter</h5>
        <p>Get weekly tech insights delivered to your inbox.</p>
        {!subscribed ? (
          <>
            <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} id="newsletter-email" />
            <button className="th-newsletter-btn" onClick={handleSubscribe} id="subscribe-btn">Subscribe</button>
          </>
        ) : (
          <div style={{ color: '#31a24c', fontWeight: 600, padding: 8 }}>
            <i className="bi bi-check-circle-fill me-2"></i>You're subscribed!
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '12px 16px', fontSize: '.6875rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
        Privacy · Terms · Advertising · Ad Choices · Cookies · More · TechHub © 2026
      </div>
    </div>
  );
}
