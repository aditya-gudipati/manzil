import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Map, Ticket, Star } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function Home() {
  const { user } = useAuth();
  const userName = user?.fullName?.split(' ')[0] || 'Traveler';
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const featureSlides = [
    {
      id: 1,
      icon: '🗺️',
      title: 'Plan a Trip',
      subtitle: 'Schedule New Alert',
      description: 'Set From/To destinations, pick a date and time, choose time-based or location-based trigger and schedule your alert instantly.',
      accentColor: 'var(--primary-green)',
      borderColor: 'rgba(45,106,79,0.5)',
      glowColor: 'rgba(45,106,79,0.2)',
      image: '/images/features/feature_alerts.png'
    },
    {
      id: 2,
      icon: '📍',
      title: 'Live Maps',
      subtitle: 'Interactive Destination Picker',
      description: 'Click anywhere on the live Leaflet map to pin your destination. Switch between Source and Destination modes seamlessly.',
      accentColor: '#7FB3D5',
      borderColor: 'rgba(127,179,213,0.5)',
      glowColor: 'rgba(127,179,213,0.2)',
      image: '/images/features/feature_map.png'
    },
    {
      id: 3,
      icon: '🌤️',
      title: 'Weather Forecast',
      subtitle: 'Destination Weather Chart',
      description: 'View temperature, feels-like, and humidity trends across the day for your destination with a clean multi-line chart.',
      accentColor: '#7FB3D5',
      borderColor: 'rgba(127,179,213,0.4)',
      glowColor: 'rgba(127,179,213,0.15)',
      image: '/images/features/feature_weather.png'
    },
    {
      id: 4,
      icon: '⚡',
      title: 'Quick Schedule',
      subtitle: 'Dash Widgets',
      description: 'Quickly access your most frequent routes like Home to College or Hostel to Station with a single click from your dashboard.',
      accentColor: 'var(--primary-green)',
      borderColor: 'rgba(45,106,79,0.3)',
      glowColor: 'rgba(45,106,79,0.1)',
      image: '/images/features/feature_quick.png'
    },
    {
      id: 5,
      icon: '⭐',
      title: 'Subscriptions',
      subtitle: 'Basic · Gold · Premium',
      description: 'Choose the plan that fits your travel style. Unlock Bus & Train bookings on Gold, and Live Flight Alerts on Premium.',
      accentColor: '#D4AF37',
      borderColor: 'rgba(212,175,55,0.5)',
      glowColor: 'rgba(212,175,55,0.2)',
      image: '/images/features/feature_subscriptions.png'
    },
    {
      id: 6,
      icon: '👤',
      title: 'Profile',
      subtitle: 'Your Travel Identity',
      description: 'Manage your personal info, city, phone, age and gender. Change password and view your current active subscription plan.',
      accentColor: 'var(--accent-brown)',
      borderColor: 'rgba(139,90,43,0.5)',
      glowColor: 'rgba(139,90,43,0.2)',
      image: '/images/features/feature_profile.png'
    },
  ];

  // Carousel auto-play
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % featureSlides.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isPaused, featureSlides.length]);

  return (
    <PageTransition>
      <div className="page-container" style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto', zIndex: 1, position: 'relative' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px', flexDirection: 'column', gap: '12px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'white', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.5)', lineHeight: 1.1, textAlign: 'center' }}>
            Welcome back,<br/> {userName}!
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', textShadow: '0 2px 8px rgba(0,0,0,0.5)', textAlign: 'center' }}>Where are we heading today?</p>
        </div>

        {/* Feature Showcase Carousel */}
        <div style={{ width: '100%', marginTop: '20px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
            <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Outfit,sans-serif', opacity: 0.9, margin: 0 }}>
              ✨ Explore Features
            </h3>
          </div>
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <div style={{
              display: 'flex',
              gap: '16px',
              position: 'relative',
              left: '50%',
              transform: `translateX(calc(-350px - ${activeIndex} * 716px))`,
              transition: 'transform 1.0s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform',
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            >
              {featureSlides.map((slide, i) => (
                <div
                  key={slide.id}
                  onClick={() => { setActiveIndex(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 6000); }}
                  style={{
                    width: '700px',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    background: activeIndex === i
                      ? `linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08))`
                      : 'rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(16px)',
                    border: activeIndex === i
                      ? `1px solid ${slide.borderColor}`
                      : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: activeIndex === i
                      ? `0 12px 40px ${slide.glowColor}, 0 0 0 1px ${slide.borderColor}`
                      : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    transform: activeIndex === i ? 'scale(1.02)' : 'scale(0.97)',
                    opacity: activeIndex === i ? 1 : 0.6,
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Image Preview */}
                  <div style={{ width: '100%', height: '380px', overflow: 'hidden', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: activeIndex === i ? 1 : 0.7, transition: 'opacity 0.4s' }} 
                    />
                  </div>

                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ fontSize: '1.8rem' }}>{slide.icon}</div>
                      <div style={{
                        display: 'inline-block',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: slide.accentColor,
                        background: `${slide.glowColor}`,
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-pill)',
                        border: `1px solid ${slide.borderColor}`,
                      }}>
                        {slide.subtitle}
                      </div>
                    </div>
                    <h4 style={{
                      color: 'white',
                      fontSize: '1.2rem',
                      fontFamily: 'Outfit,sans-serif',
                      fontWeight: 700,
                      margin: '0 0 8px',
                    }}>
                      {slide.title}
                    </h4>
                    <p style={{
                      color: 'rgba(255,255,255,0.65)',
                      fontSize: '0.875rem',
                      lineHeight: 1.5,
                      margin: 0,
                      fontFamily: 'DM Sans,sans-serif',
                    }}>
                      {slide.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '32px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {featureSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveIndex(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 6000); }}
                  style={{
                    width: activeIndex === i ? '32px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    background: activeIndex === i ? 'var(--primary-green)' : 'rgba(255,255,255,0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    padding: 0,
                  }}
                />
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => { setActiveIndex(prev => (prev - 1 + featureSlides.length) % featureSlides.length); setIsPaused(true); setTimeout(() => setIsPaused(false), 6000); }}
                style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.target.style.background = 'rgba(255,255,255,0.15)'; e.target.style.transform = 'scale(1.1)'; }}
                onMouseLeave={(e) => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.transform = 'scale(1)'; }}
              >‹</button>
              <button
                onClick={() => { setActiveIndex(prev => (prev + 1) % featureSlides.length); setIsPaused(true); setTimeout(() => setIsPaused(false), 6000); }}
                style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.target.style.background = 'rgba(255,255,255,0.15)'; e.target.style.transform = 'scale(1.1)'; }}
                onMouseLeave={(e) => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.transform = 'scale(1)'; }}
              >›</button>
            </div>
          </div>
        </div>

        <div className="features-grid" style={{ padding: '0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', width: '100%', marginBottom: '40px' }}>
          
          <div className="feature-card green" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '16px', borderRadius: '16px', width: 'fit-content' }}>
               <Map size={32} color="var(--primary-green)" />
            </div>
            <h2 style={{ fontSize: '1.6rem', margin: 0, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Plan a Trip</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', flex: 1 }}>Set smart destinations alerts and live weather tracking for your next journey.</p>
            <Link to="/trips" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ width: '100%', border: '1px solid rgba(255,255,255,0.4)' }}>Start Planning</button>
            </Link>
          </div>

          <div className="feature-card blue" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '16px', borderRadius: '16px', width: 'fit-content' }}>
               <Ticket size={32} color="var(--secondary-blue)" />
            </div>
            <h2 style={{ fontSize: '1.6rem', margin: 0, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>My Bookings</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', flex: 1 }}>Manage your upcoming bus, flight, and train tickets effortlessly.</p>
            <Link to="/bookings" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ width: '100%', background: 'var(--secondary-blue)', border: '1px solid rgba(255,255,255,0.4)' }}>View Tickets</button>
            </Link>
          </div>

          <div className="feature-card brown" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.2)', gridColumn: 'span 2' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '16px', borderRadius: '16px', width: 'fit-content' }}>
               <Star size={32} color="var(--accent-brown)" />
            </div>
            <h2 style={{ fontSize: '1.6rem', margin: 0, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Premium Features</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', flex: 1 }}>Unlock insights, faster alerts, and exclusive discounts.</p>
            <Link to="/subscriptions" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ width: '100%', background: 'var(--accent-brown)', border: '1px solid rgba(255,255,255,0.4)' }}>Upgrade Now</button>
            </Link>
          </div>
        </div>


        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
        `}</style>
      </div>
    </PageTransition>
  );
}
