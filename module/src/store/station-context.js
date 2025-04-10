import React, { useContext } from 'react';
import { stationInitialState } from './stationReducer';

// setup context with state object so typings work throughout the application
const StationContext = React.createContext({
  ...stationInitialState,
  hydrateFavourites: () => {},
  hydrateCategoriesPage: (id) => {},
});

export default StationContext;

// belt and braces so that the context can only be accessed from inside a provider
export const useStationContext = () => {
  const context = useContext(StationContext);
  if (!context) {
    throw new Error('useStationContext must be used within a StationProvider');
  }
  return context;
};
