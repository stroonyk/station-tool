import Dashboard from '@rradar/dashboard-sdk';
import { getState } from '@rradar/utilities';
import { IPublicState } from '../';

const Cookies = require('js-cookie');

export default (): Dashboard => {
  const sessionToken = Cookies.get('sessionToken');
  const dashboard = new Dashboard({
    // endpoint: getState<IPublicState>().api.endpoint,
    endpoint: 'https://dashboard.api.2ra.co.uk',
  });
  dashboard
    .auth()
    .asUserSession(
      'cfbdd81eee2a3fba739d330c74d04d3c26f178656fa0238e9a42df829a1fd998e9fece879ded6bc608c42e085eb22b4a61381b978bcbe6be8b502c6fdd127dd9'
    );
  return dashboard;
};
