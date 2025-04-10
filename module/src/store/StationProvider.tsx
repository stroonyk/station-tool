import { useReducer, useEffect } from 'react';
import StationContext from './station-context';
import stationReducer, { stationInitialState, ACTION_TYPE, UserState, UserAction } from './stationReducer';
import { useHydrators } from '../hooks/useHydrators';

const StationProvider = ({ children, config }: any) => {
  const [state, dispatch] = useReducer<React.Reducer<UserState, UserAction>>(stationReducer, {
    ...stationInitialState,
    config,
  });
  // const { hydrators, hydrateFavourites, hydrateCategoriesPage } = useHydrators(state, dispatch, config);
  const { hydrators, hydrateFavourites, hydrateCategoriesPage } = useHydrators(state, dispatch, config);

  useEffect(() => {
    dispatch({ type: ACTION_TYPE.INITIALISE });
    hydrators.forEach(({ data, hydrate }) => {
      if (!data || data.length === 0) hydrate();
    });
  }, []);

  const stationContext = {
    ...state,
    dispatch,
    hydrateFavourites,
    hydrateCategoriesPage,
  };

  return <StationContext.Provider value={stationContext}>{children}</StationContext.Provider>;
};

export default StationProvider;
