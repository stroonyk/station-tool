import { useEffect, useState } from 'react';
import AppConfig from '../../../../helpers/AppConfig';
import MainContentLayout from '../../../layouts/MainContentLayout';
import getStation from '../../../../utils/getStation';
import { IArticle } from '@rradar/station-sdk';
import { Link } from 'react-router-dom';
// import DashboardCardsContainer from './components';
// import Grid from '@rradar/core/GridTemplate';

const New = () => {
  // const appConfig = AppConfig.getInstance();
  // const [highlighted, setHighlightedArticles] = useState([]);
  // const hydrateNewsCache = async (): Promise<void> => {
  //   // const { article } = await getStation().articles().index();
  //   // const articles = await getStation().articles().index({ only_highlighted: true });
  //   const articles = await getStation().categories().index(id);
  //   // debugger;
  //   setHighlightedArticles(articles.article);
  // };
  // useEffect(() => {
  //   hydrateNewsCache();
  // }, []);
  // console.log('highlighted is wesdfs' + highlighted);
  // debugger;
  return (
    <MainContentLayout background="white">
      <h3>hello category</h3>
    </MainContentLayout>
  );
};

export default New;
