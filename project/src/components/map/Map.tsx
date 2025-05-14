import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Toilet } from '../../types/toilet';

interface MapProps {
  toilets: Toilet[];
  userLocation: [number, number];
}

const Map: React.FC<MapProps> = ({ toilets, userLocation }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  
  useEffect(() => {
    // Load Leaflet from CDN
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(linkElement);
    
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    
    script.onload = () => {
      initializeMap();
    };
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
      document.head.removeChild(linkElement);
    };
  }, []);
  
  useEffect(() => {
    if (mapInstanceRef.current && userLocation) {
      updateMapMarkers();
    }
  }, [toilets, userLocation]);
  
  const initializeMap = () => {
    if (!mapRef.current || !window.L) return;
    
    // Clear existing map instance if there is one
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }
    
    // Create new map instance
    const map = window.L.map(mapRef.current).setView(userLocation, 13);
    
    // Add tile layer (OpenStreetMap)
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add user location marker
    const userIcon = window.L.divIcon({
      className: 'user-location-marker',
      html: '<div class="relative"><div class="absolute w-6 h-6 bg-blue-500 rounded-full opacity-25 animate-ping"></div><div class="relative w-4 h-4 bg-blue-600 rounded-full border-2 border-white"></div></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
    
    window.L.marker(userLocation, { icon: userIcon }).addTo(map)
      .bindPopup('Your location')
      .openPopup();
    
    mapInstanceRef.current = map;
    updateMapMarkers();
  };
  
  const updateMapMarkers = () => {
    if (!mapInstanceRef.current || !window.L) return;
    
    const map = mapInstanceRef.current;
    
    // Clear existing markers except user location
    map.eachLayer((layer) => {
      if (layer instanceof window.L.Marker && !layer._popup?.getContent().includes('Your location')) {
        map.removeLayer(layer);
      }
    });
    
    // Add toilet markers
    toilets.forEach((toilet) => {
      // Create custom marker icon - color based on cleanliness rating
      const markerColor = getMarkerColor(toilet.cleanliness);
      
      const toiletIcon = window.L.divIcon({
        className: 'toilet-marker',
        html: `<div class="w-6 h-6 rounded-full bg-${markerColor}-500 border-2 border-white flex items-center justify-center text-white font-bold">${toilet.cleanliness}</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      
      window.L.marker([toilet.lat, toilet.lng], { icon: toiletIcon })
        .addTo(map)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-bold">${toilet.name}</h3>
            <p class="text-sm">Cleanliness: ${toilet.cleanliness}/5</p>
            <a href="/toilet/${toilet.id}" class="text-blue-600 text-sm underline">View details</a>
          </div>
        `);
    });
  };
  
  const getMarkerColor = (rating: number): string => {
    if (rating >= 4) return 'green';
    if (rating >= 3) return 'blue'; 
    if (rating >= 2) return 'yellow';
    return 'red';
  };
  
  return (
    <div ref={mapRef} className="h-full w-full">
      {/* Add a CSS style tag for the map markers */}
      <style jsx>{`
        .user-location-marker,
        .toilet-marker {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default Map;