import React, { useState, useEffect } from 'react';
import { SignInForm } from './SignIn';
import { SignUpForm } from './SignUp';
import { ChevronRight, X, Ticket, Star, MapPin, Bell } from 'lucide-react';

export default function Landing() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [authModal, setAuthModal] = useState(null); // null, 'signin', 'signup'
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const features = [
    { icon: <MapPin size={48} />, title: 'Plan a Trip', desc: 'Schedule journeys with smart time or location-based alerts.', color: 'var(--primary-green)' },
    { icon: <Ticket size={48} />, title: 'My Bookings', desc: 'Manage all your bus, train and flight tickets in one place.', color: 'var(--secondary-blue)' },
    { icon: <Bell size={48} />, title: 'Smart Alerts', desc: 'Get precisely timed wake-up calls exactly when you need them.', color: 'var(--primary-green)' },
    { icon: <Star size={48} />, title: 'Premium Features', desc: 'Unlock live flight tracking, priority support, and exclusive deals.', color: '#D4AF37', isPremium: true }
  ];

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


  useEffect(() => {
    // Only lock body scroll on desktop — on mobile, let the page scroll naturally
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      document.body.style.overflow = 'hidden';
    }
    
    const handleKeyDown = (e) => {
      if (authModal) return;
      if (e.key === 'ArrowDown') {
        setCurrentSlide(prev => Math.min(prev + 1, 2));
      } else if (e.key === 'ArrowUp') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [authModal]);

  // Carousel auto-play
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % featureSlides.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isPaused, featureSlides.length]);


  const slides = [
    { id: 'hero', label: 'Hero' },
    { id: 'features', label: 'Explore' },
    { id: 'join', label: 'Join Us' }
  ];

  const cardWidth = 450;
  const cardGap = 24;

  const isMobileView = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <div className="landing-paginated-container" style={{ 
      position: isMobileView ? 'relative' : 'fixed',
      top: 0, left: 0, width: '100vw',
      height: isMobileView ? 'auto' : '100vh',
      overflowY: isMobileView ? 'auto' : 'hidden',
      WebkitOverflowScrolling: 'touch',
      zIndex: 10
    }}>
      
      {/* Top Bar */}
      <div style={{
        position: 'fixed', top: 0, width: '100%', height: '64px', zIndex: 1000, background: 'rgba(5, 10, 15, 0.7)',
        backdropFilter: 'blur(24px)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        padding: '0 40px', borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button 
            onClick={() => setAuthModal('signin')}
            style={{ 
              padding: '8px 24px', borderRadius: 'var(--radius-pill)', border: '1px solid white', 
              color: 'white', fontWeight: 600, fontSize: '0.9rem', background: 'none', cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button 
            onClick={() => setAuthModal('signup')}
            className="btn-primary" 
            style={{ padding: '8px 24px', fontSize: '0.9rem' }}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Pages Wrapper */}
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
        transform: 'translateY(-' + currentSlide * 100 + 'vh)',
        transition: 'transform 0.6s cubic-bezier(0.77, 0, 0.175, 1)'
      }}>
        
        {/* Slide 0: Hero + Explore Carousel */}
        <div className="hero-section" style={{ 
          width: '100vw', height: '100vh', flexShrink: 0, display: 'flex', flexDirection: 'column', 
          justifyContent: 'center', alignItems: 'center', paddingTop: '100px', textAlign: 'center', position: 'relative',
          maxWidth: 'none'
        }}>
          <div style={{ marginBottom: '20px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{
              fontFamily: 'Outfit', fontWeight: 800, fontSize: 'clamp(3rem, 10vw, 7rem)',
              letterSpacing: '0.15em', margin: 0, animation: 'manzil-glow 4s infinite ease-in-out',
              textTransform: 'uppercase', lineHeight: 1, textAlign: 'center', width: '100%'
            }}>
              MANZIL
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'white', opacity: 0.9, marginTop: '12px', letterSpacing: '4px', fontWeight: 300, textAlign: 'center' }}>
              REST EASY. WE'LL WAKE YOU.
            </p>
          </div>

          <button 
            onClick={() => setAuthModal('signup')}
            className="btn-primary" 
            style={{ padding: '16px 56px', fontSize: '1.2rem', zIndex: 5, borderRadius: 'var(--radius-pill)', boxShadow: '0 8px 32px rgba(45, 106, 79, 0.4)' }}
          >
            Get Started →
          </button>

          {/* Redesigned Explore Features Carousel */}
          <div style={{ marginTop: '60px', width: '100%', overflow: 'hidden', position: 'relative' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
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
                        flexDirection: 'column',
                        textAlign: 'left'
                      }}
                    >
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
                        <h4 style={{ color: 'white', fontSize: '1.2rem', fontFamily: 'Outfit,sans-serif', fontWeight: 700, margin: '0 0 8px' }}>
                          {slide.title}
                        </h4>
                        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', lineHeight: 1.5, margin: 0, fontFamily: 'DM Sans,sans-serif' }}>
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
              </div>
            </div>
          </div>

        </div>

        {/* Explore Slide */}
        <div style={{ width: '100vw', height: '100vh', flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="features-grid" style={{ padding: '0 40px', gap: '32px' }}>
            {features.slice(0, 3).map((f, i) => (
              <div key={i} className={'feature-card ' + ['green', 'blue', 'brown'][i]}>
                <div className="feature-icon" style={{ fontSize: '2.5rem', color: f.color }}>{f.icon}</div>
                <h3 style={{ marginBottom: '16px', fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>{f.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Us Slide */}
        <div style={{ 
          width: '100vw', height: '100vh', flexShrink: 0, display: 'flex', flexDirection: 'column', 
          justifyContent: 'center', alignItems: 'center', textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '4.5rem', color: 'white', marginBottom: '24px', fontWeight: 800, textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>Join 10,000+ travelers</h2>
          <p style={{ fontSize: '1.5rem', color: 'white', opacity: 0.9, marginBottom: '48px', maxWidth: '600px', fontWeight: 300 }}>
            Experience the future of stress-free travel alerts and intelligent trip planning.
          </p>
          <button onClick={() => setAuthModal('signup')} className="btn-primary" style={{ padding: '24px 72px', fontSize: '1.5rem', borderRadius: 'var(--radius-pill)' }}>
            Sign Up Now
          </button>
          <div style={{ position: 'absolute', bottom: '30px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px' }}>
            © 2026 MANZIL | SMART TRAVEL INTELLIGENCE
          </div>
        </div>
      </div>

      {/* Auth Modal Overlay */}
      {authModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 5000,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{ position: 'relative', width: '90%', maxWidth: '420px', animation: 'scaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
            <button 
              onClick={() => setAuthModal(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            ><X size={20} /></button>
            
            {authModal === 'signin' ? (
              <SignInForm onToggleAuth={(type) => setAuthModal(type)} />
            ) : (
              <SignUpForm onToggleAuth={(type) => setAuthModal(type)} />
            )}
          </div>
        </div>
      )}

      {/* Navigation Dot Indicators */}
      <div style={{ position: 'fixed', right: '32px', top: '50%', transform: 'translateY(-50%)', zIndex: 200, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {slides.map((slide, i) => (
          <div key={slide.id} onClick={() => setCurrentSlide(i)} style={{ width: '10px', height: '10px', borderRadius: '50%', background: currentSlide === i ? 'white' : 'rgba(255,255,255,0.3)', cursor: 'pointer', transform: currentSlide === i ? 'scale(1.8)' : 'scale(1)', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />
        ))}
      </div>

      {currentSlide < 2 && (
        <button onClick={() => setCurrentSlide(prev => prev + 1)} style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 200, width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'arrow-bounce 1.5s infinite ease-in-out', color: 'white', cursor: 'pointer' }}>
          <ChevronRight size={28} style={{ transform: 'rotate(90deg)' }} />
        </button>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}
