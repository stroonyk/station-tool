import Station from '@rradar/station-sdk';
import AppConfig from '../helpers/AppConfig';

/* eslint-disable no-underscore-dangle */
export default (): Station => {
  const appConfig = AppConfig.getInstance();
  return appConfig.getConfig().station;
};
