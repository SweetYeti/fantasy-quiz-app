import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="loading-skeleton">
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
      {/* Add more skeleton items as needed */}
    </div>
  );
};

export default LoadingSkeleton;