import StationReader from '@rradar/station-tool';
import getStation from '../../utils/getStation';
import getPageId from '../../utils/getPageId';
import * as React from 'react';
import { Link } from 'react-router-dom';

const Station = () => {
  return (
    <>
      <StationReader
        config={{
          pageid: getPageId(),
          station: getStation(),
        }}
        logo={<a href="/">{/* <Logo /> */}</a>}
      />
    </>
  );
};

export default Station;
