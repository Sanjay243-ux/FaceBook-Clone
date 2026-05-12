import { useState } from 'react';

export default function Guides() {
  const [activeNav, setActiveNav] = useState('learning');

  const guides = [
    {
      id: 1,
      title: 'Getting Started with React 18',
      subtitle: 'Components, hooks, and the modern mental model',
      progress: 100,
      steps: 5,
      completedSteps: 5,
      duration: '3h 20m',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop',
      color: '#00d8ff',
      accentRgb: '0, 216, 255',
      hoursNum: 3.33,
    },
    {
      id: 2,
      title: 'Advanced UI Engineering',
      subtitle: 'Design systems, motion, and accessibility at scale',
      progress: 60,
      steps: 10,
      completedSteps: 6,
      duration: '6h 45m',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop',
      color: '#f02849',
      accentRgb: '240, 40, 73',
      hoursNum: 6.75,
    },
    {
      id: 3,
      title: 'Cloud Architecture Basics',
      subtitle: 'Regions, resilience, and cost-aware design',
      progress: 0,
      steps: 8,
      completedSteps: 0,
      duration: '5h 10m',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
      color: '#a78bfa',
      accentRgb: '167, 139, 250',
      hoursNum: 5.17,
    },
  ];

  const completedCount = guides.filter((g) => g.progress === 100).length;
  const totalHours = Math.round(guides.reduce((acc, g) => acc + g.hoursNum, 0));

  return (
    <div className="th-layout th-guides-page">
      <div className="container-fluid p-0">
        <div className="row g-0">
          <aside className="col-lg-3 d-none d-lg-flex flex-column th-guides-sidebar border-end" style={{ borderColor: 'var(--border-color)' }}>
            <div className="th-guides-sidebar-inner">
              <div className="th-guides-brand">
                <div className="th-guides-brand-mark">
                  <i className="bi bi-mortarboard-fill"></i>
                </div>
                <div>
                  <div className="th-guides-brand-title">Learning Studio</div>
                  <div className="th-guides-brand-sub">Master skills at your pace</div>
                </div>
              </div>

              <nav className="th-guides-nav" aria-label="Guides sections">
                <button
                  type="button"
                  className={`th-guides-nav-item ${activeNav === 'learning' ? 'active' : ''}`}
                  onClick={() => setActiveNav('learning')}
                >
                  <span className="th-guides-nav-icon">
                    <i className="bi bi-journal-code"></i>
                  </span>
                  <span>My Learning</span>
                </button>
                <button type="button" className={`th-guides-nav-item ${activeNav === 'explore' ? 'active' : ''}`} onClick={() => setActiveNav('explore')}>
                  <span className="th-guides-nav-icon">
                    <i className="bi bi-compass"></i>
                  </span>
                  <span>Explore Guides</span>
                </button>
                <button type="button" className={`th-guides-nav-item ${activeNav === 'certs' ? 'active' : ''}`} onClick={() => setActiveNav('certs')}>
                  <span className="th-guides-nav-icon">
                    <i className="bi bi-award"></i>
                  </span>
                  <span>Certificates</span>
                </button>
              </nav>

              <div className="th-guides-divider" />

              <p className="th-guides-section-label">Enrolled paths</p>
              <ul className="th-guides-enrolled list-unstyled mb-0">
                {guides.map((g) => (
                  <li key={g.id}>
                    <button type="button" className="th-guides-enrolled-row">
                      <span
                        className="th-guides-enrolled-dot"
                        style={{
                          background:
                            g.progress === 100 ? '#31a24c' : g.progress > 0 ? '#f7b928' : 'var(--border-color)',
                          boxShadow:
                            g.progress > 0 ? `0 0 0 3px rgba(${g.accentRgb}, 0.25)` : 'none',
                        }}
                      />
                      <span className="th-guides-enrolled-title">{g.title}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="th-guides-sidebar-card mt-auto">
                <div className="th-guides-sidebar-card-title">
                  <i className="bi bi-lightning-charge-fill text-warning"></i> Weekly goal
                </div>
                <p className="th-guides-sidebar-card-text">Complete one module this week to keep your streak.</p>
                <div className="th-guides-mini-progress">
                  <div className="th-guides-mini-progress-fill" style={{ width: '65%' }} />
                </div>
                <span className="th-guides-mini-meta">65% · 3 days left</span>
              </div>
            </div>
          </aside>

          <main className="col-lg-9 col-12 th-guides-main">
            <div className="d-lg-none px-3 pt-3 pb-2">
              <h1 className="th-guides-mobile-title">Guides</h1>
            </div>

            <div className="th-guides-main-inner">
              <header className="th-guides-hero">
                <p className="th-guides-eyebrow">
                  <span className="th-guides-eyebrow-dot" /> Curriculum · 2026
                </p>
                <h1 className="th-guides-headline">Continue where you left off</h1>
                <p className="th-guides-lede">Structured paths written by practitioners—sharp visuals, clear milestones, no filler.</p>

                <div className="th-guides-stats">
                  <div className="th-guides-stat">
                    <span className="th-guides-stat-value">{completedCount}</span>
                    <span className="th-guides-stat-label">Completed</span>
                  </div>
                  <div className="th-guides-stat-divider" />
                  <div className="th-guides-stat">
                    <span className="th-guides-stat-value">{guides.length}</span>
                    <span className="th-guides-stat-label">Enrolled</span>
                  </div>
                  <div className="th-guides-stat-divider" />
                  <div className="th-guides-stat">
                    <span className="th-guides-stat-value">~{totalHours}h</span>
                    <span className="th-guides-stat-label">Total depth</span>
                  </div>
                </div>
              </header>

              <section className="th-guides-section">
                <div className="th-guides-section-head">
                  <h2 className="th-guides-section-title">Your paths</h2>
                  <button type="button" className="th-guides-filter-chip">
                    <i className="bi bi-sliders2"></i> Sort · Recent
                  </button>
                </div>

                <div className="row g-4">
                  {guides.map((guide) => (
                    <div key={guide.id} className="col-md-6">
                      <article
                        className="th-guides-card th-card h-100"
                        style={{
                          '--guide-accent': guide.color,
                          '--guide-accent-rgb': guide.accentRgb,
                        }}
                      >
                        <div className="th-guides-card-media">
                          <img src={guide.image} alt={guide.title} loading="lazy" />
                          <div className="th-guides-card-media-gradient" />
                          <div className="th-guides-card-top-meta">
                            <span className="th-guides-pill">{guide.level}</span>
                            {guide.progress === 100 && (
                              <span className="th-guides-pill th-guides-pill-success">
                                <i className="bi bi-check2-circle"></i> Done
                              </span>
                            )}
                          </div>
                          <div className="th-guides-card-bottom-meta">
                            <span>
                              <i className="bi bi-clock me-1"></i>
                              {guide.duration}
                            </span>
                            <span>
                              <i className="bi bi-stack me-1"></i>
                              {guide.steps} modules
                            </span>
                          </div>
                        </div>

                        <div className="th-guides-card-body">
                          <h3 className="th-guides-card-title">{guide.title}</h3>
                          <p className="th-guides-card-sub">{guide.subtitle}</p>

                          <div className="th-guides-card-progress-wrap">
                            <div className="th-guides-card-progress-labels">
                              <span>
                                Module {guide.completedSteps} of {guide.steps}
                              </span>
                              <span>{guide.progress}%</span>
                            </div>
                            <div className="th-guides-card-progress-track">
                              <div className="th-guides-card-progress-fill" style={{ width: `${guide.progress}%` }} />
                            </div>
                          </div>

                          <button type="button" className="th-guides-card-cta">
                            {guide.progress === 100 ? (
                              <>
                                <i className="bi bi-arrow-repeat"></i> Review guide
                              </>
                            ) : guide.progress > 0 ? (
                              <>
                                Continue <i className="bi bi-arrow-right ms-1"></i>
                              </>
                            ) : (
                              <>
                                Start guide <i className="bi bi-play-fill ms-1"></i>
                              </>
                            )}
                          </button>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
