import { useEffect, useState } from 'react';
import AppConfig from '../../../../helpers/AppConfig';
import MainContentLayout from '../../../layouts/MainContentLayout';
import getStation from '../../../../utils/getStation';
import { IArticle } from '@rradar/station-sdk';
import { Link } from 'react-router-dom';
import { useStationContext } from '../../../../store/station-context';
// import DashboardCardsContainer from './components';
// import Grid from '@rradar/core/GridTemplate';

const New = () => {
  const appConfig = AppConfig.getInstance();
  const [highlighted, setHighlightedArticles] = useState([]);
  const { basePath } = useStationContext();

  const hydrateArticles = async (): Promise<void> => {
    // const { article } = await getStation().articles().index();
    const articles = await getStation().articles().index({ only_highlighted: true });
    // debugger;
    setHighlightedArticles(articles.article);
  };
  useEffect(() => {
    hydrateArticles();
  }, []);
  console.log('highlighted is wesdfs' + highlighted);
  // debugger;
  return (
    <MainContentLayout background="white">
      <h3>hello</h3>
      {highlighted &&
        highlighted.map((highlighted: IArticle) => (
          <div className="tile tile--white" key={highlighted.id}>
            <div className="tile-contents">
              {highlighted.title}
              <Link to={`${basePath}library/${highlighted.id}`} key={highlighted.id}>
                {highlighted.id}
              </Link>
            </div>
          </div>
        ))}
      {/* <Grid gap="1em" placeItems="center" templateDirection="column" templateValue="repeat(3, 1fr)" breakpoint={1200}>
        {isPaginated ? (
          <PaginatedTileList initialData={suggestedArticlesData} render={(tiles) => tiles} />
        ) : (
          recommendedArticles.map((recommendedArticle: IArticle) => (
            <TileLink
              key={recommendedArticle.id}
              iconClass="fa-solid fa-book-open"
              title={recommendedArticle.title}
              href={`/library/articles/${recommendedArticle.id}`}
              subtext1={`Updated at: ${new Date(recommendedArticle.updated_at).toLocaleDateString()}`}
              subtext2={`${recommendedArticle.jurisdiction_titles.join(', ')}`}
            />
          ))
        )}
      </Grid> */}
    </MainContentLayout>
  );
};

export default New;
