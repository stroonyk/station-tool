import React, { useContext } from 'react';
import stationReducer from './stationReducer';

const StationContext = React.createContext(stationReducer);

export default StationContext;

export const useStationContext = () => useContext(StationContext);
