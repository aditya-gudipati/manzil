import { NavLink, Link } from 'react-router-dom';
import { User, Map, Ticket, Star, Home } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const navItems = [
    { path: '/', icon: <Home size={18} />, label: 'Home' },
    { path: '/trips', icon: <Map size={18} />, label: 'Trips' },
    { path: '/bookings', icon: <Ticket size={18} />, label: 'Bookings' },
    { path: '/subscriptions', icon: <Star size={18} />, label: 'Premium' },
  ];

  return (
    <>
      <nav className="top-navbar">
        <div className="nav-container">
          
          <Link to="/" className="nav-logo-area">
            <img src="/logo.png" alt="Manzil Logo" className="nav-logo-img" />
            <span className="nav-logo-bus">🚌</span>
            <span className="nav-logo-text">Manzil</span>
          </Link>

          <div className="nav-links">
            {navItems.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                end={item.path === '/'}
              >
                {item.icon}
                <span className="nav-label">{item.label}</span>
                <div className="active-bar"></div>
              </NavLink>
            ))}
            
            <NavLink 
              to="/profile" 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              style={{ marginLeft: '12px' }}
            >
              <div style={{ background: 'var(--bg-cream)', padding: '6px', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
                <User size={18} />
              </div>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}
