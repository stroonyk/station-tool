import { useRef } from 'react';
import { useStationContext } from '../store/station-context';

const SWIPE_THRESHOLD = 50; // Minimum swipe distance
const SWIPE_COOLDOWN = 600; // Prevent double triggers

export const useWheelNavigation = (list) => {
  const stationCtx = useStationContext();
  const lastSwipeTime = useRef(0);

  return (event) => {
    if (!list || list.length === 0) return null;

    const now = Date.now();
    if (now - lastSwipeTime.current < SWIPE_COOLDOWN) return null; // Prevent spam swipes

    const selectedIndex = list.findIndex(({ article }) => article.id === stationCtx.selectedArticle);
    if (selectedIndex === -1) return null;

    let newIndex = selectedIndex;
    let direction = null;

    if (event.deltaX > SWIPE_THRESHOLD && selectedIndex < list.length - 1) {
      direction = 'left';
      newIndex++;
    } else if (event.deltaX < -SWIPE_THRESHOLD && selectedIndex > 0) {
      direction = 'right';
      newIndex--;
    } else {
      return null;
    }

    lastSwipeTime.current = now;
    stationCtx.setSwipeDirection(direction); // Set swipe direction inside the hook

    return newIndex;
  };
};
