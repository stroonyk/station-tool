import { default as StationNode } from '@rradar/station-sdk';
import { Request } from 'express';
import cookies from 'js-cookie';
import appConfig from './appConfig';

/**
 * @param {Request} req OPTIONAL: Only needed on server.  This is used to get the session_token
 * getStation allows for use of the station SDK without needing to pass endpoint data and session tokens everytime.
 * It checks if the window object is present, and gets the endpoint and session information from the relevant location.
 * The function works in express (with req) and on the browser
 */
const getStation = (req?: Request): StationNode => {
  let endpoint = '';
  let session = '';

  if (req) {
    endpoint = appConfig(req).stationAPIEndpoint;
    session = req.cookies?.sessionToken || '';
  } else {
    console.log('Window');
    endpoint = appConfig().stationAPIEndpoint;
    session = cookies.get('sessionToken');
  }
  const station = new StationNode({
    endpoint: endpoint,
    proxy: false,
  });
  station.authHeader = session;
  return station;
};

export default getStation;
