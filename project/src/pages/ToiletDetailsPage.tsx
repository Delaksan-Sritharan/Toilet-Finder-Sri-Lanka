import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Clock, ThumbsUp, ThumbsDown, Accessibility, Scale as MaleFemale, Droplets, File as ToiletIcon, ArrowLeft } from 'lucide-react';
import { useToilet } from '../contexts/ToiletContext';
import { useAuth } from '../contexts/AuthContext';
import ReviewForm from '../components/reviews/ReviewForm';
import ReviewList from '../components/reviews/ReviewList';
import Map from '../components/map/Map';
import { Loader } from 'lucide-react';

const ToiletDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getToiletById, loading } = useToilet();
  const { isAuthenticated } = useAuth();
  const [toilet, setToilet] = useState(null);

  useEffect(() => {
    if (id) {
      const toiletData = getToiletById(id);
      setToilet(toiletData);
    }
  }, [id, getToiletById]);

  if (loading || !toilet) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <Loader className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Map
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="mb-6 md:mb-0 md:mr-6 md:flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{toilet.name}</h1>
              
              <div className="flex items-center mb-3">
                <MapPin className="h-5 w-5 text-gray-500 mr-1" />
                <span className="text-gray-600">{toilet.address}</span>
              </div>
              
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < toilet.cleanliness
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">
                  {toilet.cleanliness.toFixed(1)} • {toilet.reviewCount} reviews
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {toilet.hasAccessibility && (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    <Accessibility className="mr-1 h-4 w-4" />
                    Accessible
                  </span>
                )}
                
                {toilet.gender && (
                  <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                    <MaleFemale className="mr-1 h-4 w-4" />
                    {toilet.gender}
                  </span>
                )}
                
                {toilet.hasWater && (
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    <Droplets className="mr-1 h-4 w-4" />
                    Has Water
                  </span>
                )}
                
                {toilet.hasToiletPaper && (
                  <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
                    <ToiletIcon className="mr-1 h-4 w-4" />
                    Toilet Paper
                  </span>
                )}
                
                {toilet.isFree ? (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    Free
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                    Paid: Rs. {toilet.price}
                  </span>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Opening Hours</h3>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-gray-600">{toilet.openingHours}</p>
                    {toilet.is24Hours && (
                      <span className="text-green-600 font-medium">Open 24 hours</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{toilet.description}</p>
              </div>
            </div>
            
            <div className="md:w-2/5">
              <div className="h-64 md:h-80 bg-gray-200 rounded-lg overflow-hidden">
                {toilet.lat && toilet.lng && (
                  <Map 
                    toilets={[toilet]} 
                    userLocation={[toilet.lat, toilet.lng]}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 px-6 py-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Reviews</h3>
            
            <div className="flex space-x-4">
              <div className="flex items-center">
                <ThumbsUp className="h-5 w-5 text-green-500 mr-1" />
                <span className="text-gray-600">{toilet.likes}</span>
              </div>
              <div className="flex items-center">
                <ThumbsDown className="h-5 w-5 text-red-500 mr-1" />
                <span className="text-gray-600">{toilet.dislikes}</span>
              </div>
            </div>
          </div>
          
          {isAuthenticated ? (
            <ReviewForm toiletId={toilet.id} />
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-gray-600">
                Please <Link to="/login" className="text-blue-600 hover:text-blue-800">log in</Link> to leave a review.
              </p>
            </div>
          )}
          
          <ReviewList reviews={toilet.reviews} />
        </div>
      </div>
    </div>
  );
};

export default ToiletDetailsPage;