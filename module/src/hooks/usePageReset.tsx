import { useEffect } from 'react';
import { useStationContext } from '../store/station-context';
import { ACTION_TYPE } from '../store/stationReducer';

const usePageReset = (id: string) => {
  const { dispatch } = useStationContext();

  useEffect(() => {
    // Scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    // Set selected sector, category, and guide
    // stationCtx.setSelectedSector(parseInt(id));
    dispatch({ type: ACTION_TYPE.SET_SELECTED_SECTOR, payload: parseInt(id) });
    // stationCtx.setSelectedCategory(-1);
    dispatch({ type: ACTION_TYPE.SET_SELECTED_CATEGORY, payload: -1 });
    // stationCtx.setSelectedGuide(-1);
    dispatch({ type: ACTION_TYPE.SET_SELECTED_GUIDE, payload: -1 });
  }, [id]);
};

export default usePageReset;
