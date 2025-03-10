import { useEffect } from 'react';
import { useStationContext } from '../store/station-context';

const usePageReset = (id: string) => {
  const stationCtx = useStationContext();

  useEffect(() => {
    // Scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    // Set selected sector, category, and guide
    stationCtx.setSelectedSector(parseInt(id));
    stationCtx.setSelectedCategory(-1);
    stationCtx.setSelectedGuide(-1);
  }, [id]);
};

export default usePageReset;
