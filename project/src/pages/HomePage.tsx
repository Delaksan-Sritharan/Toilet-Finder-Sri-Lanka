import React, { useState, useEffect } from 'react';
import Map from '../components/map/Map';
import ToiletList from '../components/toilets/ToiletList';
import FilterBar from '../components/filters/FilterBar';
import { useToilet } from '../contexts/ToiletContext';
import { Loader } from 'lucide-react';

const HomePage = () => {
  const { toilets, loading, filteredToilets, applyFilters } = useToilet();
  const [filters, setFilters] = useState({
    accessibility: false,
    maleOnly: false,
    femaleOnly: false,
    toiletPaper: false,
    water: false,
    minRating: 0,
  });
  const [view, setView] = useState('map');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to Colombo if location access is denied
          setUserLocation([6.9271, 79.8612]);
        }
      );
    } else {
      // Default to Colombo if geolocation is not supported
      setUserLocation([6.9271, 79.8612]);
    }
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const toggleView = () => {
    setView(view === 'map' ? 'list' : 'map');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <Loader className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Public Toilets in Sri Lanka</h1>
        <p className="text-gray-600">Locate clean and accessible public toilets near you.</p>
      </div>
      
      <div className="mb-6">
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          {filteredToilets.length} {filteredToilets.length === 1 ? 'toilet' : 'toilets'} found
        </h2>
        <button 
          onClick={toggleView}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Switch to {view === 'map' ? 'List' : 'Map'} View
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {view === 'map' ? (
          <div className="h-[600px]">
            {userLocation && (
              <Map 
                toilets={filteredToilets} 
                userLocation={userLocation}
              />
            )}
          </div>
        ) : (
          <ToiletList toilets={filteredToilets} />
        )}
      </div>
    </div>
  );
};

export default HomePage;