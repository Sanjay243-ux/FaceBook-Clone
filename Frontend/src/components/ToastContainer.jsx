import { useSocial } from '../context/SocialContext';

export default function ToastContainer() {
  const { toasts } = useSocial();

  if (toasts.length === 0) return null;

  const iconMap = {
    success: 'bi-check-circle-fill',
    error: 'bi-x-circle-fill',
    info: 'bi-info-circle-fill',
  };

  const colorMap = {
    success: '#31a24c',
    error: '#f02849',
    info: '#2374e1',
  };

  return (
    <div className="th-toast-container" id="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className="th-toast" style={{ '--toast-accent': colorMap[t.type] || colorMap.info }}>
          <i className={`bi ${iconMap[t.type] || iconMap.info}`} style={{ color: colorMap[t.type] || colorMap.info, fontSize: '1.25rem' }}></i>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
