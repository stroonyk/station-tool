import { useEffect, useState } from 'react';
import AppConfig from '../../../../helpers/AppConfig';
import MainContentLayout from '../../../layouts/MainContentLayout';
import getStation from '../../../../utils/getStation';
import { IArticle } from '@rradar/station-sdk';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import Masthead from '../../../../components/Masthead';
import SkeletonLoader from '../../../common/SkeletonLoader';
import HowWeHelp from '../../../common/HowWeHelp';
// import DashboardCardsContainer from './components';
// import Grid from '@rradar/core/GridTemplate';

const Classic = () => {
  const appConfig = AppConfig.getInstance();
  const [highlighted, setHighlightedArticles] = useState([]);
  const [suggested, setSuggestedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6); 

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const hydrateHighlightedArticles = async (): Promise<void> => {
    // const { article } = await getStation().articles().index();
    const articles = await getStation().articles().index({ only_highlighted: true });
    // debugger;
    // setLoading(false);
    setHighlightedArticles(articles.article);
  };
  useEffect(() => {
    hydrateHighlightedArticles();
  }, []);
  const hydrateSuggestedArticles = async (): Promise<void> => {
    // const { article } = await getStation().articles().index();
    const articles = await getStation().me().suggestedArticles().index();
    // debugger;
    setLoading(false);
    setSuggestedArticles(articles.article);
  };

  const hydrateLatestArticles = async (): Promise<void> => {
    const articles = await getStation()
      .articles()
      .index({
        no_link_tracking: true,
        '!state': 'deleted',
        page: 1,
        size: 25,
        sort: [{ key: 'updated_at', order: 'DESC' }],
      });
  };
  const hydrateFavouriteArticles = async (): Promise<void> => {
    const articles = await getStation().me().articles().favourites().index();
    // debugger;
  };

  useEffect(() => {
    // hydrateLatestArticles();
    // hydrateFavouriteArticles();
    // hydrateHighlightedArticles();
    // hydrateSuggestedArticles();
  }, []);
  return (
    <>
      <Masthead
        searchTerm={''}
        isOpen={false}
        // searchResultsCB={this.updateJoyrideOnSearchResults}
      />
      <div className="container tile-list">
        <h2 style={{ marginBottom: '20px' }}>Recommended articles</h2>
      </div>
      <div className="container tile-list">
        {loading ? (
          // Show skeleton loader when loading is true
          // <SkeletonLoader />

          <></>
        ) : (
          // Show actu
          // al articles when not loading and data is available
          highlighted.map((article) => (
            <Link
              to={`/station/library/${article.id}`}
              key={article.id}
              className={'tile tile--350 tile--link-title-underline tile--white article flex-column'}
            >
              <div className="tile-contents">
                <h2>{article.title}</h2>
                <div className="subtext my-s">{article.summary}</div>
                <div className="subtext fs--s mt-auto" />
                {article.reviewed_at && (
                  <div className="subtext fs--s">
                    <span style={{ paddingBottom: '1rem' }}>
                      Last Updated: {format(parseISO(article.reviewed_at), 'do MMM, yyyy')}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))
        )}
      </div>
      <HowWeHelp />
      <div className="container tile-list">
        <h2 style={{ margin: '20px' }}>Suggested articles</h2>
      </div>
      <div className="container tile-list">
        {suggested &&
          suggested.slice(0, visibleCount).map((article) => (
            <Link
              to={`/station/library/${article.id}`}
              key={article.id}
              className={'tile tile--350 tile--link-title-underline tile--white article flex-column'}
            >
              <div className="tile-contents">
                <h2>{article.title}</h2>
                <div className="subtext my-s" dangerouslySetInnerHTML={{ __html: article.summary }}>
                  {/* {article.summary} */}
                </div>

                <div className="subtext fs--s mt-auto" />
                {article.reviewed_at && (
                  <div className="subtext fs--s">
                    <span style={{ paddingBottom: '1rem' }}>
                      Last Updated: {format(parseISO(article.reviewed_at), 'do MMM, yyyy')}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        {visibleCount < suggested.length && (
          <button className="secondary-button button-centered" onClick={loadMore}>
            Load More
          </button>
        )}
      </div>
    </>
  );
};

export default Classic;
