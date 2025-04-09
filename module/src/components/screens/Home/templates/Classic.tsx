import { useEffect, useState } from 'react';
import AppConfig from '../../../../helpers/AppConfig';
import getStation from '../../../../utils/getStation';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import Masthead from '../../../../components/Masthead';
import HowWeHelp from '../../../common/HowWeHelp';
import { downloadTemplate, fileTypeIcons, formatDate, getTemplates } from '../../../../helpers/helpers';
import { useStationContext } from '../../../../store/station-context';

const Classic = () => {
  const appConfig = AppConfig.getInstance();
  const [highlighted, setHighlightedArticles] = useState([]);
  const [suggested, setSuggestedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const [templates, setTemplates] = useState([]);
  const { basePath } = useStationContext();

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const hydrateHighlightedArticles = async (): Promise<void> => {
    const articles = await getStation().articles().index({ only_highlighted: true });
    setHighlightedArticles(articles.article);
  };
  useEffect(() => {
    hydrateHighlightedArticles();
  }, []);
  const hydrateSuggestedArticles = async (): Promise<void> => {
    const articles = await getStation().me().suggestedArticles().index();
    setLoading(false);
    setSuggestedArticles(articles.article);
  };
  const hydrateTemplates = async (): Promise<void> => {
    const list = await getTemplates(1);
    setTemplates(list);
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

  useEffect(() => {
    // hydrateLatestArticles();
    // hydrateFavouriteArticles();
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
          <></>
        ) : (
          highlighted.map((article) => (
            <Link
              to={`${basePath}/library/${article.id}`}
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
                      {/* Last Updated:  */}
                      {format(parseISO(article.reviewed_at), 'do MMM, yyyy')}
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
              to={`${basePath}/library/${article.id}`}
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
                      {/* Last Updated:  */}
                      {format(parseISO(article.reviewed_at), 'do MMM, yyyy')}
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
      <div className="container tile-list">
        <h2 style={{ margin: '20px' }}>Commonly downloaded</h2>
      </div>
      <div className="container tile-list">
        {templates &&
          templates.map((item) => (
            <a
              key={item.id}
              className="tile tile--350 tile--link-title-underline tile--white article flex-column"
              onClick={() => downloadTemplate(item.id)}
            >
              <div className="tile-contents">
                <h2>{item.title}</h2>

                <div className="subtext my-s">{item.description}</div>
                <div className="subtext fs--s mt-auto">
                  {formatDate(new Date(item.updated_at))}
                  <span className="list-icon">
                    <i className={`fas ${fileTypeIcons[item.file_type] || 'fa-file'}`}></i>
                  </span>
                </div>
              </div>
            </a>
          ))}
      </div>
    </>
  );
};

export default Classic;
