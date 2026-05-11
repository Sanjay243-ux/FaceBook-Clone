export default function Notifications() {
  return (
    <div className="th-layout">
      <div className="container-fluid" style={{ paddingTop: '20px' }}>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 th-main-col">
            <div className="th-card p-4 text-center">
              <h2><i className="bi bi-bell-fill" style={{ color: 'var(--accent-blue)', marginRight: '10px' }}></i> Notifications</h2>
              <p className="text-muted mt-3">You have no new notifications.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
