import { useState } from 'react';

export default function Settings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [profilePublic, setProfilePublic] = useState(true);
  const [activeWho, setActiveWho] = useState('public');

  return (
    <div className="th-layout">
      <div className="container-fluid" style={{ padding: '16px 12px', maxWidth: '720px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px' }}>Settings & privacy</h1>

        <div className="th-card mb-3 overflow-hidden">
          <div className="p-3 border-bottom" style={{ borderColor: 'var(--border-color)', background: 'var(--elevated-bg)' }}>
            <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, margin: 0 }}>Notifications</h2>
          </div>
          <div className="p-3">
            <label className="d-flex justify-content-between align-items-center gap-3 mb-3" style={{ cursor: 'pointer' }}>
              <span>Email digests</span>
              <input type="checkbox" checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />
            </label>
            <label className="d-flex justify-content-between align-items-center gap-3" style={{ cursor: 'pointer' }}>
              <span>Push notifications</span>
              <input type="checkbox" checked={pushNotif} onChange={() => setPushNotif(!pushNotif)} />
            </label>
          </div>
        </div>

        <div className="th-card mb-3 overflow-hidden">
          <div className="p-3 border-bottom" style={{ borderColor: 'var(--border-color)', background: 'var(--elevated-bg)' }}>
            <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, margin: 0 }}>Privacy</h2>
          </div>
          <div className="p-3">
            <label className="d-flex justify-content-between align-items-center gap-3 mb-3" style={{ cursor: 'pointer' }}>
              <span>Public profile</span>
              <input type="checkbox" checked={profilePublic} onChange={() => setProfilePublic(!profilePublic)} />
            </label>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 8 }}>Who can see your posts?</div>
            <select
              className="form-select"
              style={{
                background: 'var(--elevated-bg)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-color)',
              }}
              value={activeWho}
              onChange={(e) => setActiveWho(e.target.value)}
            >
              <option value="public">Everyone</option>
              <option value="friends">Friends</option>
              <option value="onlyme">Only me</option>
            </select>
          </div>
        </div>

        <div className="th-card mb-3 overflow-hidden">
          <div className="p-3 border-bottom" style={{ borderColor: 'var(--border-color)', background: 'var(--elevated-bg)' }}>
            <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, margin: 0 }}>Security</h2>
          </div>
          <div className="p-3 d-grid gap-2">
            <button type="button" className="th-btn-secondary text-start">
              Change password
            </button>
            <button type="button" className="th-btn-secondary text-start">
              Two-factor authentication
            </button>
            <button type="button" className="th-btn-secondary text-start">
              Where you&apos;re logged in
            </button>
          </div>
        </div>

        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          Preferences are stored for this session demo only.
        </p>
      </div>
    </div>
  );
}
