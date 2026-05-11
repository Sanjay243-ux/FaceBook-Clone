export default function Settings() {
  return (
    <div className="th-layout">
      <div className="container-fluid" style={{ paddingTop: '20px' }}>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 th-main-col">
            <div className="th-card p-4 text-center">
              <h2><i className="bi bi-gear" style={{ color: 'var(--accent-blue)', marginRight: '10px' }}></i> Settings & Privacy</h2>
              <p className="text-muted mt-3">Account settings, privacy preferences, and security options.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
