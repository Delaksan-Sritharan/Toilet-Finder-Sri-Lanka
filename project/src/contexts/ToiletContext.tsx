import React, { createContext, useContext, useState, useEffect } from 'react';
import { Toilet, Review } from '../types/toilet';

interface ToiletContextType {
  toilets: Toilet[];
  filteredToilets: Toilet[];
  loading: boolean;
  getToiletById: (id: string) => Toilet | null;
  addToilet: (toilet: Omit<Toilet, 'id' | 'reviews' | 'reviewCount' | 'cleanliness' | 'likes' | 'dislikes' | 'distance'>) => string;
  addReview: (toiletId: string, review: Review) => void;
  applyFilters: (filters: {
    accessibility: boolean;
    maleOnly: boolean;
    femaleOnly: boolean;
    toiletPaper: boolean;
    water: boolean;
    minRating: number;
  }) => void;
}

const ToiletContext = createContext<ToiletContextType | undefined>(undefined);

export const useToilet = () => {
  const context = useContext(ToiletContext);
  if (!context) {
    throw new Error('useToilet must be used within a ToiletProvider');
  }
  return context;
};

export const ToiletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toilets, setToilets] = useState<Toilet[]>([]);
  const [filteredToilets, setFilteredToilets] = useState<Toilet[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Mock data initialization
  useEffect(() => {
    // In a real app, you would fetch this data from a backend
    const mockToilets: Toilet[] = [
      {
        id: '1',
        name: 'Colombo Central Bus Station Toilet',
        address: 'Pettah, Colombo 11',
        description: 'Public toilet at the main bus terminal. Cleaned regularly.',
        lat: 6.9350,
        lng: 79.8565,
        gender: 'all',
        cleanliness: 3.5,
        hasAccessibility: true,
        hasToiletPaper: false,
        hasWater: true,
        isFree: false,
        price: 20,
        openingHours: '6:00 AM - 10:00 PM',
        is24Hours: false,
        reviewCount: 12,
        likes: 8,
        dislikes: 3,
        distance: 0,
        reviews: [
          {
            userId: 'user1',
            userName: 'Amal Fernando',
            rating: 4,
            comment: 'Fairly clean for a bus station toilet. They charge a small fee which helps maintain it.',
            date: '2023-09-15T10:30:00Z',
            likes: 2
          },
          {
            userId: 'user2',
            userName: 'Sarah Williams',
            rating: 3,
            comment: 'Basic facilities but adequate. Bring your own toilet paper.',
            date: '2023-10-01T14:45:00Z',
            likes: 1
          }
        ]
      },
      {
        id: '2',
        name: 'Independence Square Public Restroom',
        address: 'Independence Square, Colombo 7',
        description: 'Modern facilities located near the walking path. Well-maintained.',
        lat: 6.9101,
        lng: 79.8680,
        gender: 'all',
        cleanliness: 4.2,
        hasAccessibility: true,
        hasToiletPaper: true,
        hasWater: true,
        isFree: true,
        price: 0,
        openingHours: '5:00 AM - 9:00 PM',
        is24Hours: false,
        reviewCount: 8,
        likes: 10,
        dislikes: 1,
        distance: 0,
        reviews: [
          {
            userId: 'user3',
            userName: 'Ravi Perera',
            rating: 5,
            comment: 'Very clean and free to use. Soap and toilet paper available.',
            date: '2023-11-12T09:15:00Z',
            likes: 3
          }
        ]
      },
      {
        id: '3',
        name: 'Galle Face Hotel Public Toilet',
        address: 'Galle Face, Colombo 3',
        description: 'High-quality restrooms available for public use at this historic hotel.',
        lat: 6.9287,
        lng: 79.8426,
        gender: 'all',
        cleanliness: 4.8,
        hasAccessibility: true,
        hasToiletPaper: true,
        hasWater: true,
        isFree: false,
        price: 50,
        openingHours: '7:00 AM - 11:00 PM',
        is24Hours: false,
        reviewCount: 15,
        likes: 14,
        dislikes: 0,
        distance: 0,
        reviews: [
          {
            userId: 'user4',
            userName: 'Tania Gunawardena',
            rating: 5,
            comment: 'Excellent facilities, almost like a hotel bathroom. Worth the small fee.',
            date: '2023-08-22T16:30:00Z',
            likes: 4
          },
          {
            userId: 'user5',
            userName: 'Michael Chen',
            rating: 4,
            comment: 'Very clean and well maintained. Good option for tourists.',
            date: '2023-09-18T11:20:00Z',
            likes: 2
          }
        ]
      },
      {
        id: '4',
        name: 'Kandy Railway Station Toilet',
        address: 'Railway Station, Kandy',
        description: 'Basic facilities available at the main railway station.',
        lat: 7.2906,
        lng: 80.6337,
        gender: 'all',
        cleanliness: 2.8,
        hasAccessibility: false,
        hasToiletPaper: false,
        hasWater: true,
        isFree: false,
        price: 10,
        openingHours: '5:00 AM - 9:00 PM',
        is24Hours: false,
        reviewCount: 9,
        likes: 3,
        dislikes: 5,
        distance: 0,
        reviews: [
          {
            userId: 'user6',
            userName: 'David Smith',
            rating: 2,
            comment: 'Very basic facilities. Bring your own toilet paper and sanitizer.',
            date: '2023-10-05T08:45:00Z',
            likes: 1
          }
        ]
      },
      {
        id: '5',
        name: 'Negombo Beach Public Toilet',
        address: 'Beach Road, Negombo',
        description: 'Public facilities for beach visitors. Renovated recently.',
        lat: 7.2081,
        lng: 79.8358,
        gender: 'all',
        cleanliness: 3.7,
        hasAccessibility: true,
        hasToiletPaper: false,
        hasWater: true,
        isFree: true,
        price: 0,
        openingHours: '6:00 AM - 8:00 PM',
        is24Hours: false,
        reviewCount: 11,
        likes: 7,
        dislikes: 2,
        distance: 0,
        reviews: [
          {
            userId: 'user7',
            userName: 'Emma Johnson',
            rating: 4,
            comment: 'Recently renovated and quite clean for a beach toilet. No toilet paper though.',
            date: '2023-11-02T15:10:00Z',
            likes: 2
          }
        ]
      }
    ];

    // Get user location to calculate distances
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc: [number, number] = [
            position.coords.latitude,
            position.coords.longitude
          ];
          setUserLocation(userLoc);
          
          // Calculate distances
          const toiletsWithDistance = mockToilets.map(toilet => ({
            ...toilet,
            distance: calculateDistance(
              userLoc[0], userLoc[1],
              toilet.lat, toilet.lng
            )
          }));
          
          // Sort by distance
          toiletsWithDistance.sort((a, b) => a.distance - b.distance);
          
          setToilets(toiletsWithDistance);
          setFilteredToilets(toiletsWithDistance);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          // If location access is denied, just use the mock data without distances
          setToilets(mockToilets);
          setFilteredToilets(mockToilets);
          setLoading(false);
        }
      );
    } else {
      // If geolocation is not supported
      setToilets(mockToilets);
      setFilteredToilets(mockToilets);
      setLoading(false);
    }
  }, []);

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return parseFloat(distance.toFixed(1));
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180);
  };

  const getToiletById = (id: string): Toilet | null => {
    return toilets.find(toilet => toilet.id === id) || null;
  };

  const addToilet = (toiletData: Omit<Toilet, 'id' | 'reviews' | 'reviewCount' | 'cleanliness' | 'likes' | 'dislikes' | 'distance'>): string => {
    const id = crypto.randomUUID();
    const distance = userLocation ? 
      calculateDistance(userLocation[0], userLocation[1], toiletData.lat, toiletData.lng) : 0;
    
    const newToilet: Toilet = {
      ...toiletData,
      id,
      cleanliness: 0,
      reviewCount: 0,
      likes: 0,
      dislikes: 0,
      distance,
      reviews: []
    };
    
    setToilets(prev => {
      const updated = [...prev, newToilet];
      // Re-sort by distance
      updated.sort((a, b) => a.distance - b.distance);
      return updated;
    });
    
    setFilteredToilets(prev => {
      const updated = [...prev, newToilet];
      // Re-sort by distance
      updated.sort((a, b) => a.distance - b.distance);
      return updated;
    });
    
    return id;
  };

  const addReview = (toiletId: string, review: Review) => {
    setToilets(prev => prev.map(toilet => {
      if (toilet.id === toiletId) {
        // Calculate new average rating
        const totalRating = toilet.cleanliness * toilet.reviewCount + review.rating;
        const newReviewCount = toilet.reviewCount + 1;
        const newCleanlinessRating = totalRating / newReviewCount;
        
        return {
          ...toilet,
          reviews: [...toilet.reviews, review],
          reviewCount: newReviewCount,
          cleanliness: parseFloat(newCleanlinessRating.toFixed(1))
        };
      }
      return toilet;
    }));
    
    // Update filtered toilets as well
    setFilteredToilets(prev => prev.map(toilet => {
      if (toilet.id === toiletId) {
        // Calculate new average rating
        const totalRating = toilet.cleanliness * toilet.reviewCount + review.rating;
        const newReviewCount = toilet.reviewCount + 1;
        const newCleanlinessRating = totalRating / newReviewCount;
        
        return {
          ...toilet,
          reviews: [...toilet.reviews, review],
          reviewCount: newReviewCount,
          cleanliness: parseFloat(newCleanlinessRating.toFixed(1))
        };
      }
      return toilet;
    }));
  };

  const applyFilters = (filters: {
    accessibility: boolean;
    maleOnly: boolean;
    femaleOnly: boolean;
    toiletPaper: boolean;
    water: boolean;
    minRating: number;
  }) => {
    let filtered = [...toilets];
    
    if (filters.accessibility) {
      filtered = filtered.filter(toilet => toilet.hasAccessibility);
    }
    
    if (filters.maleOnly) {
      filtered = filtered.filter(toilet => toilet.gender === 'male' || toilet.gender === 'all');
    }
    
    if (filters.femaleOnly) {
      filtered = filtered.filter(toilet => toilet.gender === 'female' || toilet.gender === 'all');
    }
    
    if (filters.toiletPaper) {
      filtered = filtered.filter(toilet => toilet.hasToiletPaper);
    }
    
    if (filters.water) {
      filtered = filtered.filter(toilet => toilet.hasWater);
    }
    
    if (filters.minRating > 0) {
      filtered = filtered.filter(toilet => toilet.cleanliness >= filters.minRating);
    }
    
    setFilteredToilets(filtered);
  };

  return (
    <ToiletContext.Provider value={{ 
      toilets, 
      filteredToilets, 
      loading,
      getToiletById,
      addToilet,
      addReview,
      applyFilters
    }}>
      {children}
    </ToiletContext.Provider>
  );
};