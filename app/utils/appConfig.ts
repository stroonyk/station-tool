import { Request } from 'express';

type HostType = 'local' | 'dev' | 'staging' | 'production';

type AppConfig = {
  stationAPIEndpoint: string;
  redirectUID: string;
  redisURL: string;
};

/**
 * @param {HostType} host Pass the deploy environment location (staging, local ....) to get the relevant values
 * Accepts `host` and returns the relevant application config for that host.
 */
const configs = (host: HostType): AppConfig => {
  const configuration = {};
  switch (host) {
    case 'dev': {
      Object.assign(configuration, {
        stationAPIEndpoint: 'https://station.api.2ra.co.uk',
        redirectUID: '',
        redisURL: '',
      });
      break;
    }
    case 'staging': {
      Object.assign(configuration, {
        stationAPIEndpoint: 'https://station.api.rreframe.com',
        redirectUID: '',
        redisURL: '',
      });
      break;
    }
    case 'production': {
      Object.assign(configuration, {
        stationAPIEndpoint: 'https://station.api.rradar.com',
        redirectUID: '',
        redisURL: '',
      });
      break;
    }
    case 'local':
    default: {
      Object.assign(configuration, {
        stationAPIEndpoint: 'https://station.api.2ra.co.uk',
        redirectUID: '60e160ce',
      });
      break;
    }
  }
  return configuration as AppConfig;
};

/**
 * @param {Request} req OPTIONAL: Only needed on server.  This is used to get the correct hostname from express.
 * Checks the hostname either with window or Request if in express.  It then uses this hostname with the configs function above,
 * to return the relevant config for that deployment environment.
 */
const appConfig = (req?: Request): AppConfig => {
  let baseURL = 'http://localhost';
  let host: HostType = 'local';

  if (req) {
    baseURL = req.headers.host;
  } else baseURL = window.location.host;

  if (baseURL.includes('2ra')) {
    host = 'dev';
  } else if (baseURL.includes('rreframe')) {
    host = 'staging';
  } else if (baseURL.includes('rradar')) {
    host = 'production';
  }

  return configs(host);
};

export { appConfig as default };
