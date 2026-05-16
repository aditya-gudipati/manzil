export default function PlanCard({ plan, currentPlan, onSelect, style }) {
  const isCurrent = plan.id === currentPlan;
  
  let themeColor = 'var(--accent-brown)';
  if (plan.id === 'gold') {
    themeColor = '#D4AF37';
  } else if (plan.id === 'premium') {
    themeColor = 'var(--secondary-blue)';
  }

  const borderStyle = isCurrent ? `2px solid var(--primary-green)` : `1px solid var(--border-color)`;

  return (
    <div className="card" style={{ 
      ...style, 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      border: borderStyle, 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      {isCurrent && (
        <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--primary-green)', color: 'white', fontSize: '0.7rem', padding: '4px 12px', borderBottomLeftRadius: 'var(--radius-sm)', fontWeight: 'bold' }}>
          ACTIVE
        </div>
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3 style={{ fontSize: '1.2rem', color: themeColor, textTransform: 'capitalize' }}>{plan.name}</h3>
        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{plan.price}</span>
      </div>
      
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>{plan.description}</p>
      
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', fontSize: '0.9rem' }}>
        {plan.features.map((feat, i) => (
          <li key={i} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--primary-green)', fontWeight: 'bold' }}>✓</span> {feat}
          </li>
        ))}
      </ul>
      
      <button 
        className="btn-primary" 
        disabled={isCurrent}
        onClick={() => !isCurrent && onSelect(plan.id)}
        style={{ 
          marginTop: 'auto',
          background: isCurrent ? 'var(--border-color)' : 'var(--primary-green)', 
          color: isCurrent ? 'var(--text-muted)' : 'white'
        }}
      >
        {isCurrent ? 'Current Plan' : 'Select Plan'}
      </button>
    </div>
  );
}
