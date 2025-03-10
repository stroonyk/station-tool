import { useEffect, useState } from 'react';
import AppConfig from '../../../../helpers/AppConfig';
import MainContentLayout from '../../../layouts/MainContentLayout';
import getStation from '../../../../utils/getStation';
import { IArticle } from '@rradar/station-sdk';
import { Link } from 'react-router-dom';
import Masthead from '../../../Masthead';
// import DashboardCardsContainer from './components';
// import Grid from '@rradar/core/GridTemplate';

const New = () => {
  const appConfig = AppConfig.getInstance();
  // debugger;
  return (
    <MainContentLayout background="white">
      <Masthead
        searchTerm={''}
        isOpen={false}
        // searchResultsCB={this.updateJoyrideOnSearchResults}
      />
    </MainContentLayout>
  );
};

export default New;
