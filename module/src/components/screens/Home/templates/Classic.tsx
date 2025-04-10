import { useEffect, useState } from 'react';
import Masthead from '../../../../components/Masthead';
import HowWeHelp from '../../../common/HowWeHelp';
import { getTemplates } from '../../../../services/station';
import { useStationContext } from '../../../../store/station-context';
import CardComponent from '../../../common/CardComponent';
import SkeletonLoader from '../../../common/SkeletonLoader';

const Classic = () => {
  const [highlighted, setHighlightedArticles] = useState([]);
  const [suggested, setSuggestedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const [templates, setTemplates] = useState([]);
  const { stationSDK } = useStationContext();

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const hydrateHighlightedArticles = async (): Promise<void> => {
    const articles = await stationSDK.articles().index({ only_highlighted: true });
    setHighlightedArticles(articles.article);
  };
  useEffect(() => {
    hydrateHighlightedArticles();
  }, []);
  const hydrateSuggestedArticles = async (): Promise<void> => {
    setLoading(true);
    const articles = await stationSDK.me().suggestedArticles().index();
    setLoading(false);
    setSuggestedArticles(articles.article);
  };
  const hydrateTemplates = async (): Promise<void> => {
    const list = await getTemplates(stationSDK, 1);
    setTemplates(list);
  };

  const hydrateLatestArticles = async (): Promise<void> => {
    const articles = await stationSDK.articles().index({
      no_link_tracking: true,
      '!state': 'deleted',
      page: 1,
      size: 25,
      sort: [{ key: 'updated_at', order: 'DESC' }],
    });
  };

  useEffect(() => {
    hydrateHighlightedArticles();
    hydrateSuggestedArticles();
    hydrateTemplates();
  }, []);
  return (
    <>
      <Masthead searchTerm={''} isOpen={false} />
      <div className="container tile-list">
        <h2 style={{ marginBottom: '20px' }}>Recommended articles</h2>
      </div>
      <div className="container tile-list">
        {loading ? (
          <SkeletonLoader />
        ) : (
          highlighted.map((item) => (
            <CardComponent path="library" isTemplate={false} key={item.id} item={item} favourite={true} />
          ))
        )}
      </div>
      <HowWeHelp />
      <div className="container tile-list">
        <h2 style={{ margin: '20px' }}>Suggested articles</h2>
      </div>
      <div className="container tile-list">
        {suggested &&
          suggested
            .slice(0, visibleCount)
            .map((item) => (
              <CardComponent path="library" isTemplate={false} key={item.id} item={item} favourite={true} />
            ))}
        {visibleCount < suggested.length && (
          <button className="secondary-button button-centered" onClick={loadMore}>
            Load More
          </button>
        )}
      </div>
      <div className="container tile-list">
        <h2 style={{ margin: '20px' }}>Commonly downloaded</h2>
      </div>
      <div className="container tile-list">
        {templates &&
          templates.map((item) => (
            <CardComponent isTemplate={true} key={item.id} item={item} favourite={false} templateId={item.id} />
          ))}
      </div>
    </>
  );
};

export default Classic;
