export default function CreatePost() {
  return (
    <div className="th-card th-create-post-card" id="create-post-box">
      <div className="th-card-body">
        <div className="th-create-post-top">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="User" className="th-create-avatar" />
          <input type="text" className="th-create-input" placeholder="What's on your mind?" id="create-post-input" />
        </div>
        <div className="th-create-divider"></div>
        <div className="th-create-actions">
          <button className="th-create-action-btn" id="btn-live-video">
            <i className="bi bi-camera-video-fill" style={{ color: '#f3425f' }}></i>
            <span className="d-none d-sm-inline">Live video</span>
          </button>
          <button className="th-create-action-btn" id="btn-photo">
            <i className="bi bi-image-fill" style={{ color: '#45bd62' }}></i>
            <span className="d-none d-sm-inline">Photo/video</span>
          </button>
          <button className="th-create-action-btn" id="btn-code">
            <i className="bi bi-code-slash" style={{ color: '#f7b928' }}></i>
            <span className="d-none d-sm-inline">Code snippet</span>
          </button>
        </div>
      </div>
    </div>
  );
}
