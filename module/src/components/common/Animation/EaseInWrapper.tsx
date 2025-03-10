import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface EaseInWrapperProps {
  children: ReactNode;
}

const EaseInWrapper = ({ children }: EaseInWrapperProps) => {
  const location = useLocation();
  // console.log('ease in wrapper location is ' + location.pathname + location.search + location.key);
  // debugger;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname + location.search + location.key} // Triggers animation on route change
        initial={{ opacity: 0 }} // Start fully transparent
        animate={{ opacity: 1 }} // Fade in to full visibility
        exit={{ opacity: 0 }} // Fade out when navigating away
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default EaseInWrapper;
