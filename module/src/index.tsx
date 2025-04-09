import * as React from 'react';
import './styles/index.scss';
import './icons';
import { IStationProps } from './types';
import StationProvider from './store/StationProvider';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import { Home, Library, Category, Guide, Templates, Sectors, Tags, Browse, Search } from './components/screens';
import AppConfig from './helpers/AppConfig';
// import { IPublicState } from '.';
// import { MobileMenu, SiteFooter, SiteHeader, SiteLoader } from '@rradar/core';
// import { getSessionToken } from '@rradar/utilities';
// import getAccounts from './utils/getAccounts';
// import getDashboard from './utils/getDashboard';
import { useStationContext } from './store/station-context';
// import CustomDropdown from './components/common/CustomDropdown';
// import Filters from './components/common/Filters';
import MainContentLayout from './components/layouts/MainContentLayout';
// import AppDisclaimer from './components/screens/Library/components/disclaimer';

const Cookies = require('js-cookie');

export interface IAppProps {
  refresh: boolean;
  hybrid_monoserver: boolean;
}
const App = ({ refresh }) => {
  const { basePath } = useStationContext();
  if (basePath === null) return;
  // const basePath = config.hybrid_monoserver ? '/station' : '';
  // debugger;
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<MainContentLayout background="pearl" />}>
          <Route path={`${basePath}/`} element={<Home />} />
          <Route path={`${basePath}/library/:id`} element={<Library refresh={refresh} />} />
          <Route path={`${basePath}/categories/:id`} element={<Category refresh={refresh} />} />
          <Route path={`${basePath}/guides/:id`} element={<Guide refresh={refresh} />} />
          <Route path={`${basePath}/templates`} element={<Templates refresh={refresh} />} />
          <Route path={`${basePath}/sectors/:id`} element={<Sectors refresh={refresh} />} />
          <Route path={`${basePath}/tags/:id`} element={<Tags refresh={refresh} />} />
          <Route path={`${basePath}/browse`} element={<Browse refresh={refresh} />} />
          <Route path={`${basePath}/search`} element={<Search refresh={refresh} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const DISCLAIMER_COOKIE = 'mainDisclaimerAccepted';

const StationReader = (props: IStationProps) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = React.useState(false);
  const [switchUrl, setSwitchUrl] = React.useState('');

  React.useEffect(() => {
    (async () => {
      // const { url } = await getDashboard().auth().generateSwitchCompanyURL();
      // setSwitchUrl(url);
    })();
  }, []);

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
  // props.config.user = user;
  props.config.page = props.config.page || {}; // Ensure `page` exists
  // props.config.page.title = `${user.user_first_name} ${user.user_last_name}`;
  props.config.page.title = `Welcome to your online knowledge library`;
  const appConfig = AppConfig.getInstance();
  appConfig.setConfig(props.config);
  // console.log('props are baby ' + props.refresh);
  // debugger;
  // const stationCtx = useStationContext();
  return (
    <>
      <StationProvider config={props.config}>
        {/* <App refresh={props.refresh} hybrid_monoserver={props.config.hybrid_monoserver} /> */}
        <App refresh={props.refresh} />
      </StationProvider>
    </>
  );
};

export default StationReader;
