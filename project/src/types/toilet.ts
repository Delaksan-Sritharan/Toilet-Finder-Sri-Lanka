export interface Review {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  likes?: number;
}

export interface Toilet {
  id: string;
  name: string;
  address: string;
  description: string;
  lat: number;
  lng: number;
  gender: 'male' | 'female' | 'all';
  cleanliness: number; // Rating from 0-5
  hasAccessibility: boolean;
  hasToiletPaper: boolean;
  hasWater: boolean;
  isFree: boolean;
  price: number; // In LKR, 0 if free
  openingHours: string;
  is24Hours: boolean;
  reviewCount: number;
  likes: number;
  dislikes: number;
  distance: number; // Distance from user in km
  reviews: Review[];
}