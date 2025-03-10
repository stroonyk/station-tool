// import { getState } from '@rradar/utilities';
// import { IPublicState } from '../..';
import { IPublicState } from '..';
import AppConfig from './AppConfig';

const getState = (): IPublicState => {
  const appConfig = AppConfig.getInstance();
  // debugger;
  // return appConfig.getConfig().user;
  return appConfig.getConfig();
};

export default getState;
