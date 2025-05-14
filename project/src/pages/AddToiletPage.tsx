import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Info, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToilet } from '../contexts/ToiletContext';
import Map from '../components/map/Map';

const AddToiletPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToilet } = useToilet();
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    gender: 'all',
    openingHours: '',
    is24Hours: false,
    hasAccessibility: false,
    hasToiletPaper: false,
    hasWater: false,
    isFree: true,
    price: '',
  });
  
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/add' } });
      return;
    }
    
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc: [number, number] = [
            position.coords.latitude,
            position.coords.longitude
          ];
          setUserLocation(userLoc);
          setLocation(userLoc); // Set initial marker to user's location
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to Colombo if location access is denied
          setUserLocation([6.9271, 79.8612]);
          setLocation([6.9271, 79.8612]);
        }
      );
    }
  }, [isAuthenticated, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field if any
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
    
    // If toilet is free, clear price
    if (name === 'isFree' && checked) {
      setFormData({ ...formData, [name]: checked, price: '' });
    }
  };
  
  const handleMapClick = (lat: number, lng: number) => {
    setLocation([lat, lng]);
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!location) {
      newErrors.location = 'Please mark the location on the map';
    }
    
    if (!formData.isFree && (!formData.price.trim() || isNaN(Number(formData.price)))) {
      newErrors.price = 'Please enter a valid price';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const toiletData = {
      ...formData,
      lat: location ? location[0] : 0,
      lng: location ? location[1] : 0,
      price: formData.isFree ? 0 : Number(formData.price),
    };
    
    const id = addToilet(toiletData);
    navigate(`/toilet/${id}`);
  };
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Add a New Toilet Location</h1>
        <p className="text-gray-600">
          Help others find clean and accessible toilets by adding a new location.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-5">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Location Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full rounded-md border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="E.g., Central Bus Station Toilet"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>
              
              <div className="mb-5">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full rounded-md border ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  } px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Street address or landmark"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.address}
                  </p>
                )}
              </div>
              
              <div className="mb-5">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Additional information about this toilet"
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Genders</option>
                  <option value="male">Male Only</option>
                  <option value="female">Female Only</option>
                </select>
              </div>
              
              <div className="mb-5">
                <div className="flex items-center justify-between">
                  <label htmlFor="openingHours" className="block text-sm font-medium text-gray-700">
                    Opening Hours
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is24Hours"
                      name="is24Hours"
                      checked={formData.is24Hours}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is24Hours" className="ml-2 text-sm text-gray-600">
                      Open 24 hours
                    </label>
                  </div>
                </div>
                <input
                  type="text"
                  id="openingHours"
                  name="openingHours"
                  value={formData.openingHours}
                  onChange={handleInputChange}
                  disabled={formData.is24Hours}
                  className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    formData.is24Hours ? 'bg-gray-100' : ''
                  }`}
                  placeholder="E.g., 8:00 AM - 10:00 PM"
                />
              </div>
              
              <div className="mb-5">
                <span className="block text-sm font-medium text-gray-700 mb-2">Amenities</span>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hasAccessibility"
                      name="hasAccessibility"
                      checked={formData.hasAccessibility}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hasAccessibility" className="ml-2 text-sm text-gray-600">
                      Wheelchair Accessible
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hasToiletPaper"
                      name="hasToiletPaper"
                      checked={formData.hasToiletPaper}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hasToiletPaper" className="ml-2 text-sm text-gray-600">
                      Toilet Paper Available
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hasWater"
                      name="hasWater"
                      checked={formData.hasWater}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hasWater" className="ml-2 text-sm text-gray-600">
                      Water Available
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mb-5">
                <span className="block text-sm font-medium text-gray-700 mb-2">Fee</span>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="isFree"
                    name="isFree"
                    checked={formData.isFree}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isFree" className="ml-2 text-sm text-gray-600">
                    Free to use
                  </label>
                </div>
                
                {!formData.isFree && (
                  <div>
                    <label htmlFor="price" className="block text-sm text-gray-600 mb-1">
                      Price (LKR)
                    </label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className={`w-full rounded-md border ${
                        errors.price ? 'border-red-500' : 'border-gray-300'
                      } px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="E.g., 20"
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.price}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mark Location on Map *
                </label>
                <p className="text-sm text-gray-500 mb-2 flex items-start">
                  <Info className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                  Click on the map to mark the exact location of the toilet
                </p>
                
                <div className="h-[400px] bg-gray-200 rounded-lg overflow-hidden">
                  {userLocation && (
                    <Map
                      toilets={location ? [{ id: 'new', lat: location[0], lng: location[1], name: 'New Location' }] : []}
                      userLocation={userLocation}
                    />
                  )}
                </div>
                
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.location}
                  </p>
                )}
                
                {location && (
                  <div className="mt-2 text-sm text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-blue-600" />
                    Latitude: {location[0].toFixed(6)}, Longitude: {location[1].toFixed(6)}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Add Toilet Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToiletPage;