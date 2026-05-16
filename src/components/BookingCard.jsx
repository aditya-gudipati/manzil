export default function BookingCard({ operator, time, duration, price }) {
  let borderColor = 'var(--border-color)';
  if (operator === 'AbhiBus') borderColor = 'var(--primary-green)';
  else if (operator === 'RedBus') borderColor = 'var(--secondary-blue)';
  else if (operator === 'Goibibo') borderColor = 'var(--accent-brown)';

  return (
    <div className="card" style={{ marginBottom: '16px', borderLeft: `6px solid ${borderColor}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{operator}</h3>
        <span style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '1.1rem' }}>₹{price}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
        <span>⏰ {time}</span>
        <span>⏳ {duration}</span>
      </div>
      <button className="btn-primary" style={{ padding: '10px', fontSize: '0.95rem' }}>Book Now</button>
    </div>
  );
}
