import StationTool from '@rradar/station-tool';
import getStation from '../../utils/getStation';
import getPageId from '../../utils/getPageId';
import * as React from 'react';
import { IPublicState } from '../types';
import { useAppContext } from '../store/app-context';

const Station = () => {
  const { appstate } = useAppContext();
  const navigatedHomeHandler = () => {};
  return (
    <>
      <StationTool
        config={{
          user: appstate.user,
          pageid: getPageId(),
          station: getStation(),
          classic: false,
          navigatedHome: navigatedHomeHandler,
          hybrid_monoserver: false,
        }}
        logo={<a href="/">{/* <Logo /> */}</a>}
      />
    </>
  );
};

export default Station;
