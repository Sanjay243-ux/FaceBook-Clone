export default function Profile() {
  return (
    <div className="th-layout">
      <div className="container-fluid" style={{ paddingTop: '20px' }}>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 th-main-col">
            <div className="th-card p-4 text-center">
              <div className="mb-4">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="User" style={{ width: 120, height: 120, borderRadius: '50%', border: '4px solid var(--elevated-bg)' }} />
              </div>
              <h2><i className="bi bi-person-circle" style={{ color: 'var(--accent-blue)', marginRight: '10px' }}></i> Your Profile</h2>
              <p className="text-muted mt-3">Profile details, posts, and activity will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
