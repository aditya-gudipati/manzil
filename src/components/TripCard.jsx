export default function TripCard({ from, to, date, time, mode, alertType, alertTime, radius }) {
  return (
    <div className="card" style={{ marginBottom: '16px', borderLeft: '4px solid var(--primary-green)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {from} <span style={{ color: 'var(--primary-green)' }}>→</span> {to}
        </h3>
        <span className="badge badge-basic" style={{ background: 'var(--bg-cream)', border: '1px solid var(--border-color)' }}>{mode}</span>
      </div>
      <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📅 {date}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>⏰ {time}</span>
      </div>
      <div style={{ backgroundColor: 'rgba(45, 106, 79, 0.05)', padding: '12px', borderRadius: 'var(--radius-sm)', color: 'var(--primary-green)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
        {alertType === 'location' ? (
          <>📍 Proximity Alert: {radius} from destination</>
        ) : (
          <>🔔 Alert set for {alertTime} before</>
        )}
      </div>
    </div>
  );
}
