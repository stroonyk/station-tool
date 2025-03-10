import Dashboard from '@rradar/dashboard-sdk';
import AppConfig from '../helpers/AppConfig';

/* eslint-disable no-underscore-dangle */
export default (): Dashboard => {
  const appConfig = AppConfig.getInstance();
  return appConfig.getConfig().dashboard;
};
