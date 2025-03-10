const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-header"></div>
    <div className="skeleton-body">
      {Array(4)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="skeleton-line">
            <div className="skeleton-shimmer"></div>
          </div>
        ))}
    </div>
  </div>
);

export default SkeletonCard;
