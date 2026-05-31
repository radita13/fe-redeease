import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating, onRatingChange, max = 5, size = 20, readonly = false }) {
  const stars = Array.from({ length: max }, (_, idx) => idx + 1);

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => {
        const isFilled = star <= rating;
        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => onRatingChange && onRatingChange(star)}
            className={`transition-all duration-150 ${
              readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 active:scale-95'
            }`}
          >
            <Star
              size={size}
              className={`${
                isFilled
                  ? 'fill-secondary-container text-secondary-container'
                  : 'text-outline-variant/50 fill-none'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
