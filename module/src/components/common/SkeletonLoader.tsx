import { useState, useEffect } from 'react';
import SkeletonCard from './SkeletonCard';

const SkeletonLoader = () => {
  const [visibleCards, setVisibleCards] = useState(1);

  useEffect(() => {
    if (visibleCards < 3) {
      const timer = setTimeout(() => {
        setVisibleCards((prev) => prev + 1);
      }, 500); // Adjust delay as needed

      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [visibleCards]);

  return (
    <div className="skeleton-container">
      {Array(visibleCards)
        .fill(null)
        .map((_, i) => (
          <SkeletonCard key={i} />
        ))}
    </div>
  );
};

export default SkeletonLoader;
