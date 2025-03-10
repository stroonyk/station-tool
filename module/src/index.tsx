import * as React from 'react';
import './styles/index.scss';
import './icons';
import { IStationProps } from './types';
import StationProvider from './store/StationProvider';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import { Home, Library, Category, Guide, Templates, Sectors, Tags, Browse, Search } from './components/screens';
import AppConfig from './helpers/AppConfig';
import { IPublicState } from '.';
import { MobileMenu, SiteFooter, SiteHeader, SiteLoader } from '@rradar/core';
import { getSessionToken } from '@rradar/utilities';
// import getAccounts from './utils/getAccounts';
// import getDashboard from './utils/getDashboard';
import { useStationContext } from './store/station-context';
import CustomDropdown from './components/common/CustomDropdown';
import Filters from './components/common/Filters';
import MainContentLayout from './components/layouts/MainContentLayout';
// import AppDisclaimer from './components/screens/Library/components/disclaimer';

const Cookies = require('js-cookie');

const AppInner = ({ refresh }) => {
  return (
    // <SiteLoader isLoading={stationCtx?.loadingObj?.loading}>
    // <SiteLoader isLoading={false} >
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<MainContentLayout background="pearl" />}>
          <Route path="/station" element={<Home />} />
          <Route path="/station/library/:id" element={<Library refresh={refresh} />} />
          <Route path="/station/categories/:id" element={<Category refresh={refresh} />} />
          <Route path="/station/guides/:id" element={<Guide refresh={refresh} />} />
          <Route path="/station/templates" element={<Templates refresh={refresh} />} />
          <Route path="/station/sectors/:id" element={<Sectors refresh={refresh} />} />
          <Route path="/station/tags/:id" element={<Tags refresh={refresh} />} />
          <Route path="/station/browse" element={<Browse refresh={refresh} />} />
          <Route path="/station/search" element={<Search refresh={refresh} />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // </SiteLoader>
  );
};

const DISCLAIMER_COOKIE = 'mainDisclaimerAccepted';

const StationReader = (props: IStationProps) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = React.useState(false);
  const { api, user } = window.__PUBLIC_STATE__ as IPublicState;
  const [switchUrl, setSwitchUrl] = React.useState('');

  React.useEffect(() => {
    (async () => {
      // const { url } = await getDashboard().auth().generateSwitchCompanyURL();
      // setSwitchUrl(url);
    })();
  }, []);

  // const signOut = async () => {
  //   try {
  //     await getAccounts().auth().logout('application_token', getSessionToken('sessionToken'));
  //     Cookies.remove('sessionToken');
  //     window.location.href = '/';
  //   } catch (err) {
  //     // eslint-disable-next-line no-console
  //     console.error('Error Signing Out');
  //   }
  // };

  // const footerColumns = [
  //   {
  //     header: 'Contact Info',
  //     id: 'contact_info',
  //     contents: [
  //       { title: 'General Inquires', id: 'general_inquires' },
  //       { title: 'Email', strong: 'contactus@rradar.com', id: 'email' },
  //     ],
  //   },
  //   {
  //     header: 'Disclaimers',
  //     id: 'disclaimers',
  //     contents: [
  //       {
  //         title: 'General Disclaimer',
  //         id: 'general_disclaimer',
  //         onClick: () => {
  //           setDisclaimerOpen(true);
  //         },
  //       },
  //     ],
  //   },
  // ];
  if (process.env.NODE_ENV === 'development') {
    console.log('Development mode - showing all console.log() output');
  } else {
    console.log('Production mode - hiding console.log() output');
    console.log = () => {};
  }
  const permissions = [
    'ARTICLE_EDITING',
    'ARTICLE_MANAGEMENT',
    'TAXONOMY_MANAGEMENT',
    'SEARCH_REBUILD',
    'LIVECHAT_ACCESS',
    'CUSTOM_LANDING_PAGE',
    'HIDE_SITE_ELEMENTS',
    'BROKEN_LINKS_MANAGEMENT',
    'STATIC_LANDING_CATEGORIES',
    'STATIC_ARTICLES',
    'CONTACT_DETAILS_OVERRIDE',
  ];
  props.config.permissions = permissions;
  props.config.user = user;
  props.config.page = props.config.page || {}; // Ensure `page` exists
  // props.config.page.title = `${user.user_first_name} ${user.user_last_name}`;
  props.config.page.title = `Welcome to your online knowledge library`;
  const appConfig = AppConfig.getInstance();
  appConfig.setConfig(props.config);
  // console.log('props are baby ' + props.refresh);
  // debugger;
  const stationCtx = useStationContext();
  return (
    <>
      {/* <SiteHeader
        profileItemProps={{
          companyName: user.company_name,
          isCompanySwitchable: true,
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
        drawerOpen={mobileOpen}
        toggleDrawer={() => setMobileOpen(!mobileOpen)}
        gutterLevel="restricted"
        customLogo={props.logo}
        customLogoWidth="200"
        customLogoHeight="45"
      /> */}
      {/* <MobileMenu
        isOpen={mobileOpen}
        toggleOpen={() => setMobileOpen(!mobileOpen)}
        navigationListItems={[]}
        // navigationListItems={generateMenuItems(application_count)}
        profileItemProps={{
          companyName: user.company_name,
          isCompanySwitchable: user.company.can_switch,
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
      /> */}

      {/* <Link to="/megaapp/station">Go to Station</Link> */}

      {/* <main className="restricted-gutter-v"> */}
      <StationProvider>
        <AppInner refresh={props.refresh} />
      </StationProvider>
      {/* <AppDisclaimer
          disclaimerIsOpen={disclaimerOpen}
          toggleDisclaimer={() => setDisclaimerOpen(!disclaimerOpen)}
          disclaimerCookie={DISCLAIMER_COOKIE}
        /> */}
      {/* </main> */}
      {/* <SiteFooter footerColumns={footerColumns} gutterLevel="restricted" /> */}
    </>
  );
};

export default StationReader;
