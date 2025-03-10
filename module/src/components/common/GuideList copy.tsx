import { Link } from 'react-router-dom';
import { useStationContext } from '../../store/station-context';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

export interface IGuideProps {
  guides: [];
}
const SWIPE_THRESHOLD = 50; // Minimum swipe distance
const SWIPE_COOLDOWN = 500; // Prevent double triggers
const GuideList: React.FC<IGuideProps> = ({ guides }) => {
  const stationCtx = useStationContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const lastSwipeTime = useRef(0);

  const handleWheel = (event: WheelEvent) => {
    const now = Date.now();
    if (now - lastSwipeTime.current < SWIPE_COOLDOWN) return;
    lastSwipeTime.current = now;

    if (event.deltaX > SWIPE_THRESHOLD && currentIndex < documents.length - 1) {
      setDirection('left');
      setCurrentIndex((prev) => prev + 1);
    } else if (event.deltaX < -SWIPE_THRESHOLD && currentIndex > 0) {
      setDirection('right');
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const documents = [
    { id: 1, title: 'Document 1', content: 'This is the first document.' },
    { id: 2, title: 'Document 2', content: 'This is the second document.' },
    { id: 3, title: 'Document 3', content: 'This is the third document.' },
  ];

  return (
    <>
      <div className="reader-container" onWheel={handleWheel}>
        <motion.div
          key={documents[currentIndex].id}
          initial={{ opacity: 0, x: direction === 'left' ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction === 'left' ? -100 : 100 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="document"
        >
          <h2>{documents[currentIndex].title}</h2>
          <p>{documents[currentIndex].content}</p>
          {/* {guides && guides.length > 0 && (
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
        )} */}
        </motion.div>
      </div>
    </>
  );
};

export default GuideList;
