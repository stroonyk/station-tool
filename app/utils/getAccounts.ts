import Accounts from '@rradar/accounts-sdk';

const Cookies = require('js-cookie');

const getAccounts = () => {
  const { api } = window.__PUBLIC_STATE__;
  const sessionToken = Cookies.get('sessionToken');
  const accounts = new Accounts({
    endpoint: api.endpoint,
    proxy: true,
  });
  accounts.auth().asUserSession(sessionToken);

  return accounts;
};

export default getAccounts;
