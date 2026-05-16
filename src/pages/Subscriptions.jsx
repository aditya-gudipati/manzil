import { useAuth } from '../context/AuthContext';
import PlanCard from '../components/PlanCard';
import PageTransition from '../components/PageTransition';

export default function Subscriptions() {
  const { user, updatePlan } = useAuth();

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for quick commutes.',
      features: ['Trips only']
    },
    {
      id: 'gold',
      name: 'Gold',
      price: '₹99/month',
      description: 'Ideal for frequent travelers.',
      features: ['Trips support', 'Bus & Train Bookings']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₹199/month',
      description: 'The ultimate travel companion.',
      features: ['Trips support', 'All Bookings', 'Live Flight Alerts']
    }
  ];

  const handleSelectPlan = (planId) => {
    updatePlan(planId);
  };

  return (
    <PageTransition>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 80px)', padding: '24px', boxSizing: 'border-box', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div className="page-header">
          <h1 className="page-title" style={{ color: 'var(--accent-brown)' }}>Subscriptions</h1>
          <p className="page-subtitle">Upgrade your travel experience</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px', flex: 1, alignItems: 'stretch', marginTop: '16px' }}>
          {plans.map(plan => (
            <PlanCard 
              key={plan.id} 
              plan={plan} 
              currentPlan={user?.plan} 
              onSelect={handleSelectPlan} 
              style={{ flex: 1 }}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
