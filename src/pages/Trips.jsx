import { useState, useEffect, useRef } from 'react';
import TripCard from '../components/TripCard';
import RealMap from '../components/RealMap';
import WeatherForecastChart from '../components/WeatherForecastChart';
import { calculateDistance, getCoordinates, getLocationName } from '../utils/locationService';
import PageTransition from '../components/PageTransition';
import { Briefcase, MapPin, Zap, Navigation, CloudSun, Bell } from 'lucide-react';

export default function Trips() {
  const [activeSection, setActiveSection] = useState('planatrip');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    alertType: 'time',
    alertTime: '15 min',
    radius: '1 km',
    mode: 'Bus',
    fromCoords: null,
    toCoords: null
  });
  const [submitted, setSubmitted] = useState(false);
  const [trips, setTrips] = useState([]);
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);
  const audioRef = useRef(null);
  
  const mockForecast = [
    { time: '10:00', temp: 24, feelsLike: 26, humidity: 60, description: 'Clear sky' },
    { time: '13:00', temp: 28, feelsLike: 30, humidity: 55, description: 'Sunny' },
    { time: '16:00', temp: 27, feelsLike: 29, humidity: 65, description: 'Partly cloudy' },
    { time: '19:00', temp: 22, feelsLike: 22, humidity: 70, description: 'Clear' },
    { time: '22:00', temp: 19, feelsLike: 19, humidity: 75, description: 'Cool' },
  ];

  const [trackingTrip, setTrackingTrip] = useState(null);
  const [currentDist, setCurrentDist] = useState(null);

  useEffect(() => {
    let watcher = null;
    const checkProximity = async (position) => {
      const { latitude, longitude } = position.coords;
      let targetLat, targetLon;
      if (trackingTrip.toCoords) {
        targetLat = trackingTrip.toCoords.lat;
        targetLon = trackingTrip.toCoords.lon;
      } else {
        const coords = await getCoordinates(trackingTrip.to);
        targetLat = coords.lat;
        targetLon = coords.lon;
      }
      const distance = calculateDistance(latitude, longitude, targetLat, targetLon);
      setCurrentDist(distance.toFixed(3));
      const radiusValue = parseFloat(trackingTrip.radius);
      const isMeters = trackingTrip.radius.includes('m') && !trackingTrip.radius.includes('km');
      const radiusInKm = isMeters ? radiusValue / 1000 : radiusValue;
      if (distance <= radiusInKm) {
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.warn("Audio play blocked", e));
        }
        setIsAlarmRinging(true);
        setTrackingTrip(null); 
      }
    };
    if (trackingTrip && trackingTrip.alertType === 'location') {
      navigator.geolocation.getCurrentPosition(checkProximity, (err) => console.error(err));
      watcher = navigator.geolocation.watchPosition(checkProximity, (error) => console.error("Geolocation error:", error), { enableHighAccuracy: true });
    }
    return () => { if (watcher) navigator.geolocation.clearWatch(watcher); };
  }, [trackingTrip]);

  const handleMapSelect = async (lat, lng, mode) => {
    const name = await getLocationName(lat, lng);
    if (mode === 'source') {
      setFormData(prev => ({ ...prev, from: name, fromCoords: { lat, lon: lng, name } }));
    } else {
      setFormData(prev => ({ ...prev, to: name, toCoords: { lat, lon: lng, name } }));
    }
  };

  const handleQuickTrip = (from, to) => {
    setFormData(prev => ({ ...prev, from, to }));
    setActiveSection('planatrip');
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const newTrip = { ...formData };
    setTrips([newTrip, ...trips]);
    if (newTrip.alertType === 'location') {
      setTrackingTrip(newTrip);
    }
    setFormData({
      from: '', to: '', date: '', time: '', alertType: 'time', alertTime: '15 min', radius: '1 km', mode: 'Bus',
      fromCoords: null, toCoords: null
    });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleStopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsAlarmRinging(false);
  };

  const SidebarButton = ({ section, icon: Icon, label }) => (
    <button 
      onClick={() => setActiveSection(section)}
      style={{
        width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: activeSection === section ? 'rgba(45, 106, 79, 0.2)' : 'rgba(255,255,255,0.05)', 
        border: activeSection === section ? '2px solid var(--primary-green)' : '1px solid rgba(255,255,255,0.1)',
        color: activeSection === section ? 'var(--primary-green)' : 'rgba(255,255,255,0.6)',
        transition: 'all 0.2s ease', cursor: 'pointer'
      }}
      title={label}
    >
      <Icon size={22} />
    </button>
  );

  return (
    <PageTransition>
      <div className="trips-layout" style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', width: '100%', maxWidth: '900px', margin: '0 auto', padding: '16px', gap: '16px', boxSizing: 'border-box', flexWrap: 'wrap' }}>
        
        {/* Sidebar */}
        <div className="trips-sidebar" style={{ width: '64px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', paddingTop: '8px' }}>
          <SidebarButton section="quicktrips" icon={Zap} label="Quick Trips" />
          <SidebarButton section="planatrip" icon={Navigation} label="Plan a Trip" />
          <SidebarButton section="map" icon={MapPin} label="Map" />
          <SidebarButton section="weather" icon={CloudSun} label="Weather" />
          <SidebarButton section="activetrips" icon={Briefcase} label="Active Trips" />
        </div>

        {/* Right Panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', WebkitOverflowScrolling: 'touch', position: 'relative', minWidth: 0 }} className="custom-scrollbar">
          
          {/* Change 2: Alarm Popup (Bottom-Right) */}
          {isAlarmRinging && (
            <div 
              style={{ 
                position: 'fixed', bottom: '24px', right: '24px', zIndex: 2000, width: '320px',
                background: 'linear-gradient(135deg, rgba(208,0,0,0.85), rgba(140,0,0,0.9))', 
                backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '24px', 
                boxShadow: '0 0 60px rgba(208,0,0,0.6), 0 20px 48px rgba(0,0,0,0.5)', 
                border: '1px solid rgba(255,100,100,0.4)', color: 'white',
                animation: 'slideUpFade 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
                <div style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', animation: 'pulse-red 2s infinite' }}>
                  <MapPin size={48} style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))' }} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 4px 0', letterSpacing: '0.02em' }}>Destination Reached!</h2>
                  <p style={{ opacity: 0.9, fontSize: '0.95rem', margin: 0 }}>You've entered the alert zone</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.15)', padding: '6px 16px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 600, fontSize: '0.9rem' }}>
                  📍 {trips[0]?.to || 'Destination'}
                </div>
                <button 
                  onClick={handleStopAlarm} 
                  className="alarm-stop-btn"
                  style={{ 
                    padding: '14px 40px', background: 'white', color: '#d00000', border: 'none', 
                    borderRadius: 'var(--radius-pill)', fontWeight: 800, fontSize: '1rem', cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)', transition: 'all 0.2s'
                  }}
                >
                  STOP ALARM
                </button>
              </div>
            </div>
          )}

          {trackingTrip && (
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', background: 'rgba(45, 106, 79, 0.1)' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden' }}>
                <img src="/motion-ui-hero.png" alt="Tracking" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div className="pulse-green" style={{ width: '8px', height: '8px', background: 'var(--primary-green)', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>Transit Mode Active</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>To: {trackingTrip.to} | <b>{currentDist || '...'} km away</b></p>
              </div>
              <button onClick={() => setTrackingTrip(null)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', padding: '10px' }}><Bell size={20} color="white" /></button>
            </div>
          )}

          {activeSection === 'quicktrips' && (
            <div className="card">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={18} /> Quick Schedule</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <button onClick={() => handleQuickTrip('Home', 'College')} className="f-card-interactive" style={{ padding: '20px', textAlign: 'center' }}>🏠 Home → 🎓 College</button>
                <button onClick={() => handleQuickTrip('Hostel', 'Station')} className="f-card-interactive" style={{ padding: '20px', textAlign: 'center' }}>🏢 Hostel → 🚉 Station</button>
              </div>
            </div>
          )}

          {activeSection === 'planatrip' && (
            <>
              <div className="page-header">
                <h1 className="page-title text-green">Schedule New Alert</h1>
                <p className="page-subtitle">We'll wake you up before you reach.</p>
              </div>

              <div className="card" style={{ marginBottom: '24px' }}>
                <form onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <div className="input-group"><label>From</label><input type="text" name="from" required value={formData.from} onChange={handleChange} placeholder="From" /></div>
                    <div className="input-group"><label>To</label><input type="text" name="to" required value={formData.to} onChange={handleChange} placeholder="To" /></div>
                  </div>
                  <div className="form-grid" style={{ marginTop: '12px' }}>
                    <div className="input-group"><label>Date</label><input type="date" name="date" required value={formData.date} onChange={handleChange} /></div>
                    <div className="input-group"><label>Time</label><input type="time" name="time" required value={formData.time} onChange={handleChange} /></div>
                  </div>
                  <div className="form-grid" style={{ marginTop: '12px' }}>
                    <div className="input-group"><label>Trigger</label><select name="alertType" value={formData.alertType} onChange={handleChange}><option value="time">Time-based</option><option value="location">Location-based</option></select></div>
                    {formData.alertType === 'time' ? (
                      <div className="input-group"><label>Wait Time</label><select name="alertTime" value={formData.alertTime} onChange={handleChange}><option>15 min</option><option>30 min</option></select></div>
                    ) : (
                      <div className="input-group"><label>Alert Radius</label><select name="radius" value={formData.radius} onChange={handleChange}><option>500 m</option><option>1 km</option><option>2 km</option></select></div>
                    )}
                  </div>
                  <button type="submit" className="btn-primary" style={{ marginTop: '16px', width: '100%', height: '48px' }}>Schedule Alert</button>
                </form>
                {submitted && <div style={{ marginTop: '16px', color: 'var(--primary-green)', fontWeight: 700, textAlign: 'center', background: 'rgba(45, 106, 79, 0.1)', padding: '10px', borderRadius: '12px' }}>🎉 Success! Trip Scheduled.</div>}
              </div>
            </>
          )}

          {activeSection === 'activetrips' && (
            <div style={{ paddingBottom: '20px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}><Briefcase size={22} color="var(--primary-green)" /> My Trips</h2>
              {trips.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {trips.map((trip, idx) => ( <TripCard key={idx} {...trip} /> ))}
                </div>
              ) : (
                <div className="card" style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🗺️</div>
                  <h3 style={{ color: 'white', margin: '0 0 8px 0' }}>No trips planned yet</h3>
                  <p style={{ color: 'var(--text-muted)', margin: 0 }}>Start by scheduling your first alert in the Plan a Trip tab.</p>
                  <button onClick={() => setActiveSection('planatrip')} className="btn-primary" style={{ marginTop: '24px', background: 'none', border: '1px solid var(--primary-green)', color: 'var(--primary-green)' }}>Plan Now</button>
                </div>
              )}
            </div>
          )}

          {activeSection === 'map' && (
            <div style={{ flex: 1, minHeight: '400px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <RealMap source={formData.fromCoords} destination={formData.toCoords} radius={formData.radius} onLocationSelect={handleMapSelect} />
            </div>
          )}

          {activeSection === 'weather' && (
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><CloudSun size={20} color="var(--secondary-blue)" /> Weather Forecast</h3>
              <WeatherForecastChart forecastData={mockForecast} />
            </div>
          )}

        </div>

        <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" preload="auto" loop />

        <style>{`
          @keyframes slideUpFade {
            from { transform: translateY(40px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes pulse-red {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0.4); }
            70% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(255,255,255,0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0); }
          }
          .alarm-stop-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 12px 32px rgba(0,0,0,0.3);
          }
          .f-card-interactive {
            background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); 
            border-radius: 16px; color: white; cursor: pointer; transition: all 0.2s;
          }
          .f-card-interactive:hover {
            background: rgba(45, 106, 79, 0.15); border-color: var(--primary-green);
          }
          .pulse-green { animation: pulse-g 2s infinite; }
          @keyframes pulse-g {
            0% { box-shadow: 0 0 0 0 rgba(45, 106, 79, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(45, 106, 79, 0); }
            100% { box-shadow: 0 0 0 0 rgba(45, 106, 79, 0); }
          }
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
        `}</style>
      </div>
    </PageTransition>
  );
}
