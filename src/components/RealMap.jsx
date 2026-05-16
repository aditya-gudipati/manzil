import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

// Custom Markers using DivIcon for modern, colored looks
const createCustomIcon = (color) => L.divIcon({
  html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 10px;">${color === '#3a86ff' ? 'S' : 'D'}</div>`,
  className: 'custom-marker-icon',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const sourceIcon = createCustomIcon('#3a86ff'); // Blue for Source
const destIcon = createCustomIcon('#2d6a4f'); // Green for Destination

function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 14);
  }, [center]);
  return null;
}

export default function RealMap({ source, destination, radius, onLocationSelect }) {
  const [selectionMode, setSelectionMode] = useState('destination'); // 'source' or 'destination'
  const [userPos, setUserPos] = useState([12.9716, 77.5946]); // Default to Bangalore
  const [flyTo, setFlyTo] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserPos(coords);
        setFlyTo(coords);
      },
      () => console.warn("Location permission denied, using default.")
    );
  }, []);

  const handleMyLocation = () => {
    if (userPos) {
      setFlyTo(userPos);
      onLocationSelect(userPos[0], userPos[1], 'source');
    }
  };

  function MapEvents() {
    useMapEvents({
      click(e) {
        onLocationSelect(e.latlng.lat, e.latlng.lng, selectionMode);
      },
    });
    return null;
  }

  const radiusInMeters = radius ? parseFloat(radius) * (radius.includes('km') ? 1000 : 1) : 1000;

  const fullScreenStyle = isFullScreen ? {
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999, margin: 0, background: 'var(--bg-card)'
  } : {
    position: 'relative', marginTop: '16px'
  };

  return (
    <div className="premium-map-container" style={fullScreenStyle}>
      {/* Map Header with Selection Mode */}
      <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', zIndex: 1000, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <button 
            onClick={() => setSelectionMode('source')}
            style={{ 
              padding: '6px 12px', border: 'none', borderRadius: 'var(--radius-sm)', transition: '0.3s', cursor: 'pointer',
              backgroundColor: selectionMode === 'source' ? '#3a86ff' : 'transparent',
              color: selectionMode === 'source' ? 'white' : 'var(--text-main)',
              fontWeight: 600, fontSize: '0.8rem'
            }}
          >Source</button>
          <button 
            onClick={() => setSelectionMode('destination')}
            style={{ 
              padding: '6px 12px', border: 'none', borderRadius: 'var(--radius-sm)', transition: '0.3s', cursor: 'pointer',
              marginLeft: '4px',
              backgroundColor: selectionMode === 'destination' ? '#2d6a4f' : 'transparent',
              color: selectionMode === 'destination' ? 'white' : 'var(--text-main)',
              fontWeight: 600, fontSize: '0.8rem'
            }}
          >Destination</button>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{ 
              background: isDarkMode ? '#222' : 'white', color: isDarkMode ? 'white' : '#222', border: '1px solid var(--border-color)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontSize: '1.2rem', transition: '0.3s' 
            }}
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
          >{isDarkMode ? '☀️' : '🌙'}</button>
          <button 
            onClick={() => setIsFullScreen(!isFullScreen)}
            style={{ 
              background: 'white', color: '#222', border: '1px solid var(--border-color)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontSize: '1.2rem', transition: '0.3s' 
            }}
            title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
          >{isFullScreen ? '↙️' : '↗️'}</button>
          <button 
            onClick={handleMyLocation}
            style={{ 
              background: 'var(--primary-green)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontSize: '1.2rem' 
            }}
            title="Use My Location as Source"
          >📍</button>
        </div>
      </div>

      <div style={{ height: isFullScreen ? '100%' : '350px', width: '100%', borderRadius: isFullScreen ? '0' : 'var(--radius-md)', overflow: 'hidden', border: isFullScreen ? 'none' : '1px solid var(--border-color)', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
        <MapContainer center={userPos} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          {/* CartoDB tiles depending on mode */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={isDarkMode ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"}
          />
          <MapController center={flyTo} />
          <MapEvents />
          
          {source && source.lat && (
            <Marker position={[source.lat, source.lon]} icon={sourceIcon}>
              <Popup>Source: {source.name || 'Start Point'}</Popup>
            </Marker>
          )}

          {destination && destination.lat && (
            <>
              <Marker position={[destination.lat, destination.lon]} icon={destIcon}>
                <Popup>Destination: {destination.name || 'Goal'}</Popup>
              </Marker>
              <Circle 
                center={[destination.lat, destination.lon]} 
                radius={radiusInMeters}
                pathOptions={{ color: '#2d6a4f', fillColor: '#2d6a4f', fillOpacity: 0.15, weight: 2 }}
              />
            </>
          )}
        </MapContainer>
      </div>
      <div style={{ padding: '8px', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', fontWeight: 600 }}>
        Click on the map to set your {selectionMode}.
      </div>
    </div>
  );
}
