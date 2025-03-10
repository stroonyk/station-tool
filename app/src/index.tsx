// import * as ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import * as React from 'react';
// import StationReader from '@rradar/station-reader';
import '../scss/index.scss';
import { IPublicState } from './types';
import { MobileMenu, SiteFooter, SiteHeader, SiteLoader } from '@rradar/core';
import { getSessionToken } from '@rradar/utilities';
// import getStation from '../utils/getStation';
// import getPageId from '../utils/getPageId';
import { init, replayIntegration, getCurrentScope } from '@sentry/browser';
// import Logo from '../img/risk_logo_black.svg';
import getAccounts from '../utils/getAccounts';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Station from './components/Station';
const Cookies = require('js-cookie');

// const [mobileOpen, setMobileOpen] = React.useState(false);
const application = document.getElementById('root');
const reactRoot = createRoot(application);
const body = document.querySelector('.admin');
//!Ignored because __PUBLIC_STATE__ does not exist on window.  Needs adding to d.ts somehow.
//@ts-ignore
const state = window.__PUBLIC_STATE__ as IPublicState;
const { user } = state;
if (state.sentry?.enabled) {
  init({
    dsn: state.sentry.dsn,
    environment: state.sentry.environment || 'development',
    release: 'station-ui@' + process.env.npm_package_version,
    autoSessionTracking: true,
    integrations: replayIntegration ? [replayIntegration()] : [],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });

  const scope = getCurrentScope();

  scope.setUser({
    email: user ? user.user_email : 'N/A',
    username: user ? `${user.user_first_name} ${user.user_last_name}` : 'N/A',
    id: user ? user.user_id.toString() : 'N/A',
  });
}
const signOut = async () => {
  try {
    await getAccounts()
      .auth()
      .logout('application_token', getSessionToken('sessionToken'));
    Cookies.remove('sessionToken');
    window.location.href = '/';
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error Signing Out');
  }
};
const footerColumns = [
  {
    header: 'Contact Info',
    id: 'contact_info',
    contents: [
      { title: 'General Inquires', id: 'general_inquires' },
      { title: 'Email', strong: 'contactus@rradar.com', id: 'email' },
    ],
  },
  {
    header: 'Disclaimers',
    id: 'disclaimers',
    contents: [
      {
        title: 'General Disclaimer',
        id: 'general_disclaimer',
        onClick: () => {
          // setDisclaimerOpen(true);
          false;
        },
      },
    ],
  },
];
const App = () => {
  return (
    <>
      <Station />
    </>
  );
};
reactRoot.render(
  <>
    <SiteHeader
      profileItemProps={{
        companyName: user.company_name,
        // isCompanySwitchable: user.company.can_switch,
        switchCompany: () => {
          window.location.href = `${switchUrl}&redirect_url_uid=${api.redirect_url_uid}&state=${window.location.href}`;
        },
        fullName: `${user.user_first_name} ${user.user_last_name}`,
        logout: signOut,
        avatarUrl: user.me && user.me.avatar_url,
        gravatar: {
          default: 'identicon',
          email: user.user_email,
          size: 30,
        },
      }}
      drawerOpen={false}
      toggleDrawer={() => false}
      gutterLevel="restricted"
      // customLogo={props.logo}
      customLogoWidth="200"
      customLogoHeight="45"
    />
    <App />

    <SiteFooter
      footerColumns={footerColumns}
      gutterLevel="restricted"
      termsAndConditionsFunction={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  </>
);
