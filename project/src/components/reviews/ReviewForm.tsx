import React, { useState } from 'react';
import { Star, SendHorizonal } from 'lucide-react';
import { useToilet } from '../../contexts/ToiletContext';
import { useAuth } from '../../contexts/AuthContext';

interface ReviewFormProps {
  toiletId: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ toiletId }) => {
  const { addReview } = useToilet();
  const { user } = useAuth();
  
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<{ rating?: string; comment?: string }>({});
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { rating?: string; comment?: string } = {};
    
    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    
    if (!comment.trim()) {
      newErrors.comment = 'Please enter a comment';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    addReview(toiletId, {
      rating,
      comment,
      userId: user?.id || '',
      userName: user?.name || 'Anonymous',
      date: new Date().toISOString(),
    });
    
    // Reset form
    setRating(0);
    setComment('');
    setErrors({});
  };
  
  return (
    <div className="mb-6 bg-gray-50 rounded-lg p-4">
      <h4 className="text-lg font-medium text-gray-900 mb-3">Leave a Review</h4>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cleanliness Rating
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none p-1"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select a rating'}
            </span>
          </div>
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Your Review
          </label>
          <textarea
            id="comment"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Share your experience..."
          />
          {errors.comment && (
            <p className="mt-1 text-sm text-red-600">{errors.comment}</p>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <SendHorizonal className="h-4 w-4 mr-2" />
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;