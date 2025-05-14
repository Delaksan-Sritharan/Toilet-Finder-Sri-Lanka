import React from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { Review } from '../../types/toilet';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  return (
    <div className="space-y-6">
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No reviews yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Be the first to share your experience!
          </p>
        </div>
      ) : (
        reviews.map((review, index) => (
          <div 
            key={index} 
            className={`${
              index !== reviews.length - 1 ? 'border-b border-gray-200 pb-6' : ''
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                  {review.userName.charAt(0).toUpperCase()}
                </div>
              </div>
              
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">{review.userName}</h4>
                  <time className="text-xs text-gray-500">{formatDate(review.date)}</time>
                </div>
                
                <div className="mt-1 flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="mt-2 text-sm text-gray-700">
                  <p>{review.comment}</p>
                </div>
                
                <div className="mt-2 flex items-center text-sm">
                  <button className="inline-flex items-center text-gray-500 hover:text-blue-600">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{review.likes || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;