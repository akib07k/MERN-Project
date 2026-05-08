import { Star, StarHalf } from 'lucide-react';

const Rating = ({ value, text, color = '#f8e825' }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((index) => (
          <span key={index}>
            {value >= index ? (
              <Star
                className="w-4 h-4 fill-current"
                style={{ color }}
              />
            ) : value >= index - 0.5 ? (
              <div className="relative">
                <Star
                  className="w-4 h-4 text-gray-300"
                />
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <Star
                    className="w-4 h-4 fill-current"
                    style={{ color }}
                  />
                </div>
              </div>
            ) : (
              <Star className="w-4 h-4 text-gray-300" />
            )}
          </span>
        ))}
      </div>
      {text && <span className="text-sm text-gray-600 ml-1">{text}</span>}
    </div>
  );
};

export default Rating;
