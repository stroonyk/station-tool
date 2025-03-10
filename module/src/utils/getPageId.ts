import AppConfig from '../helpers/AppConfig';

/* eslint-disable no-underscore-dangle */
export default (): string => {
    const appConfig = AppConfig.getInstance();
    return appConfig.getConfig().pageid;
}

