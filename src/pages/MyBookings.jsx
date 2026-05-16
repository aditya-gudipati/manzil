import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import BookingCard from '../components/BookingCard';
import RealMap from '../components/RealMap';
import PageTransition from '../components/PageTransition';

export default function MyBookings() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useState({ from: '', to: '', date: '', toCoords: null });
  const [searched, setSearched] = useState(false);
  
  // Locked screen for basic users
  if (user?.plan === 'basic') {
    return (
      <PageTransition>
        <div className="page-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div className="card" style={{ textAlign: 'center', maxWidth: '400px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔒</div>
            <h2 className="page-title text-brown">Premium Feature</h2>
            <p className="page-subtitle" style={{ marginBottom: '24px' }}>
              Booking insights are only available on Gold and Premium plans.
            </p>
            <Link to="/subscriptions" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ backgroundColor: '#D4AF37' }}>
                Upgrade Now
              </button>
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const mockResults = [
    { id: 1, operator: 'AbhiBus', time: '10:00 AM', duration: '5h 30m', price: 450 },
    { id: 2, operator: 'RedBus', time: '11:30 AM', duration: '6h 00m', price: 420 },
    { id: 3, operator: 'Goibibo', time: '12:15 PM', duration: '5h 45m', price: 480 },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
  };

  const handleMapSelect = (lat, lng) => {
    setSearchParams(prev => ({ 
      ...prev, 
      to: `${lat.toFixed(4)}, ${lng.toFixed(4)}`, 
      toCoords: { lat, lng } 
    }));
  };

  return (
    <PageTransition>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title text-blue">Find Tickets</h1>
          <p className="page-subtitle">Compare buses and book instantly</p>
        </div>

        <div className="card">
          <form onSubmit={handleSearch}>
            <div className="form-grid">
              <div className="input-group">
                <label>From</label>
                <input type="text" required value={searchParams.from} onChange={e => setSearchParams({...searchParams, from: e.target.value})} placeholder="City" />
              </div>
              <div className="input-group">
                <label>To</label>
                <input type="text" required value={searchParams.to} onChange={e => setSearchParams({...searchParams, to: e.target.value})} placeholder="City or Click Map" />
              </div>
            </div>
            <div className="input-group">
              <label>Date</label>
              <input type="date" required value={searchParams.date} onChange={e => setSearchParams({...searchParams, date: e.target.value})} />
            </div>
            <button type="submit" className="btn-primary" style={{ backgroundColor: 'var(--secondary-blue)' }}>
              Search Tickets
            </button>
          </form>
        </div>

        <RealMap 
          destination={searchParams.toCoords}
          onLocationSelect={handleMapSelect}
        />

        {searched && (
          <div style={{ marginTop: '24px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Available Buses</h2>
            {mockResults.map(res => (
              <BookingCard key={res.id} {...res} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
