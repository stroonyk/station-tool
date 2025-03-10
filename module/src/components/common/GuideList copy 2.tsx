import { Link, useNavigate } from 'react-router-dom';
import { useStationContext } from '../../store/station-context';
import { useRef, useState } from 'react';
import { useWheelNavigation } from '../../hooks/useWheelNavigation';

export interface IGuideProps {
  guides: [];
}
const SWIPE_THRESHOLD = 50; // Minimum swipe distance
const SWIPE_COOLDOWN = 600; // Prevent double triggers
const GuideList: React.FC<IGuideProps> = ({ guides }) => {
  const stationCtx = useStationContext();
  const navigate = useNavigate();
  const lastSwipeTime = useRef(0);

  // const handleWheel = (event: WheelEvent) => {
  //   if (!guides || guides.length === 0) return;

  //   const now = Date.now();
  //   if (now - lastSwipeTime.current < SWIPE_COOLDOWN) return; // Prevent spam swipes

  //   const selectedIndex = guides.findIndex(({ article }) => article.id === stationCtx.selectedArticle);
  //   if (selectedIndex === -1) return;

  //   let newIndex = selectedIndex;
  //   let direction: 'left' | 'right' | null = null;

  //   if (event.deltaX > SWIPE_THRESHOLD && selectedIndex < guides.length - 1) {
  //     // Swipe Left → Move to Next Article
  //     direction = 'left';
  //     newIndex++;
  //   } else if (event.deltaX < -SWIPE_THRESHOLD && selectedIndex > 0) {
  //     // Swipe Right → Move to Previous Article
  //     direction = 'right';
  //     newIndex--;
  //   } else {
  //     return; // Do nothing if at limits or swipe is too weak
  //   }

  //   lastSwipeTime.current = now; // Update cooldown timer

  //   // stationCtx.setPrevSwipeDirection(stationCtx.swipeDirection); // Update previous direction
  //   stationCtx.setSwipeDirection(direction); // Update current direction

  //   navigate(`/Station/library/${guides[newIndex].article.id}`);
  // };

  const handleWheel = (event: WheelEvent) => {
    const newIndex = useWheelNavigation(guides, event);
    navigate(`/Station/library/${guides[newIndex].article.id}`);
  };

  return (
    <>
      <div className="reader-container" onWheel={handleWheel}>
        {guides && guides.length > 0 && (
          // <div className="container mini-guide-list-container">
          <div className="mini-guide-list-container">
            {guides.map(({ id, article }) => (
              <Link
                className={`mini-guide-list-card ${article.id === stationCtx.selectedArticle ? 'selected' : ''}`}
                to={`/Station/library/${article.id}`}
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
