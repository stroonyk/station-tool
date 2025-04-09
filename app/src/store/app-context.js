import React, { useContext } from 'react';
import { stationInitialState } from './appReducer';

const AppContext = React.createContext(stationInitialState);

export default AppContext;

export const useAppContext = () => useContext(AppContext);
