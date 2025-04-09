import { useReducer, useEffect, useCallback, useState } from 'react';
import React from 'react';
import AppContext from './app-context';
import appReducer, { appInitialState, ACTION_TYPE } from './appReducer';

export interface IAppProvider {
  children: React.ReactNode;
  appstate: any;
}
const AppProvider = ({ children, appstate }: IAppProvider) => {
  const [state, dispatch] = useReducer(appReducer, {
    ...appInitialState,
    appstate,
  });

  const setClassic = (classicStation: boolean) => {
    // appDispatch({ type: ACTION_TYPE.SET_CLASSIC, payload: classicStation });
  };

  const appContext = {
    ...state,
    dispatch,
  };

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
