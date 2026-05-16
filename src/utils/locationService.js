/**
 * Calculate distance between two points in km using Haversine formula
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // radius of Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Get coordinates from location name using Nominatim (OpenStreetMap)
 * Fallback to mock coordinates for common demo names
 */
export const getCoordinates = async (query) => {
  const mockLocations = {
    'home': { lat: 12.9716, lon: 77.5946 }, // Bangalore
    'college': { lat: 13.0827, lon: 80.2707 }, // Chennai
    'hostel': { lat: 12.9716, lon: 77.5946 },
    'station': { lat: 13.0827, lon: 80.2707 },
  };

  const lowerQuery = query.toLowerCase().trim();
  if (mockLocations[lowerQuery]) {
    return mockLocations[lowerQuery];
  }

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      };
    }
  } catch (error) {
    console.warn("Geocoding failed, using fallback mock", error);
  }

  // Final fallback (simulated random location near the query if it was a real search)
  return { lat: 12.97 + Math.random() * 0.1, lon: 77.59 + Math.random() * 0.1 };
};

/**
 * Get address name from coordinates using Nominatim Reverse Geocoding
 */
export const getLocationName = async (lat, lon) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`);
    const data = await response.json();
    if (data && data.display_name) {
      // Return a shortened, cleaner name (e.g., "MG Road, Bangalore")
      const parts = data.display_name.split(',');
      return parts.length > 2 ? `${parts[0]}, ${parts[1]}` : data.display_name;
    }
  } catch (error) {
    console.warn("Reverse geocoding failed", error);
  }
  return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
};
