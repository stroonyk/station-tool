import { Link, useNavigate } from 'react-router-dom';
import { useStationContext } from '../../store/station-context';
// import { useRef, useState } from 'react';
import { useWheelNavigation } from '../../hooks/useWheelNavigation';

export interface IGuideProps {
  guides: [];
}

const GuideList: React.FC<IGuideProps> = ({ guides }) => {
  const navigate = useNavigate();
  const { selectedArticle, basePath } = useStationContext();
  const handleWheelEvent = useWheelNavigation(guides); // Pass guides list

  const handleWheel = (event: WheelEvent) => {
    const newIndex = handleWheelEvent(event);
    if (newIndex === null) return;
    navigate(`${basePath}/library/${guides[newIndex].article.id}`);
  };

  return (
    <>
      <div className="reader-container" onWheel={handleWheel}>
        {guides && guides.length > 0 && (
          // <div className="container mini-guide-list-container">
          <div className="mini-guide-list-container">
            {guides.map(({ id, article }) => (
              <Link
                className={`mini-guide-list-card ${article.id === selectedArticle ? 'selected' : ''}`}
                to={`${basePath}/library/${article.id}`}
                key={`guide${article.id}`}
              >
                <span className="article-title">{article.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default GuideList;
