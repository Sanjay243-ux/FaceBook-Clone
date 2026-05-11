export default function Messenger() {
  return (
    <div className="th-layout">
      <div className="container-fluid" style={{ paddingTop: '20px' }}>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 th-main-col">
            <div className="th-card p-4 text-center">
              <h2><i className="bi bi-chat-dots-fill" style={{ color: 'var(--accent-blue)', marginRight: '10px' }}></i> Messenger</h2>
              <p className="text-muted mt-3">Your chats and conversations will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
