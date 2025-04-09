import { Link, useParams } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';
import { useEffect, useState } from 'react';
// import MainContentLayout from '../../layouts/MainContentLayout';
// import readingTime from 'reading-time';

import { useMediaQuery } from 'react-responsive';
import getStation from '../../../utils/getStation';
// import CustomDropdown from '../../common/CustomDropdown';
import { useNavigate } from 'react-router-dom';
// import Filters from '../../common/Filters';
import Breadcrumb from '../../common/Breadcrumbs/Breadcrumbs';
import GuideList from '../../common/GuideList';
import JurisdictionList from '../../common/JurisdictionList';
import TemplateList from '../../common/TemplateList';
import Breadcrumbs from '../../common/Breadcrumbs/Breadcrumbs';
import TagsList from '../../common/TagsList';
import RelatedArticleList from '../../common/RelatedArticleList';
import SectorBreadcrumb from '../../common/Breadcrumbs/SectorBreadcrumb';
import GuideBreadcrumb from '../../common/Breadcrumbs/GuideBreadcrumb';
import { AnimatePresence, motion } from 'framer-motion';
import { formatDate } from '../../../helpers/helpers';
import FavouriteButton from '../../common/FavouriteButton';
import { ACTION_TYPE } from '../../../store/stationReducer';

const Library = ({ refresh }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { dispatch, swipeDirection, selectedGuide } = useStationContext();
  const { id } = useParams();
  const isSmallerScreen = useMediaQuery({
    query: '(min-width: 1200px)',
  });
  const [article, setArticle] = useState();

  // const [templates, setTemplates] = useState([]);
  const [readingTimeText, setReadingTimeText] = useState('');
  let fadeInFromLeft = false;

  const hydrateArticle = async (): Promise<void> => {
    const articles = await getStation().articles().get(parseInt(id), { with_meta: true });
    setArticle(articles);
    // debugger;
    // stationCtx.setSelectedArticle(parseInt(id));
    dispatch({ type: ACTION_TYPE.SET_SELECTED_ARTICLE, payload: parseInt(id) });
    // stationCtx.setSelectedCategory(articles.article.category_ids?.[0] || null);
    dispatch({ type: ACTION_TYPE.SET_SELECTED_CATEGORY, payload: articles.article.category_ids?.[0] || null });
    // stationCtx.setSelectedSector(articles.sectors?.[0]?.id ?? null);
    dispatch({ type: ACTION_TYPE.SET_SELECTED_SECTOR, payload: articles.sectors?.[0]?.id ?? null });
    // stationCtx.setSelectedGuide(articles.sequences?.[0]?.id ?? null);
    dispatch({ type: ACTION_TYPE.SET_SELECTED_GUIDE, payload: articles.sequences?.[0]?.id ?? null });
    const duration = articles.article.metadata?.reading_time;
    setReadingTimeText(`Approximately ${duration} minute${duration === 1 ? '' : 's'}`);
    setLoading(false);
    if (swipeDirection === 'right') {
      fadeInFromLeft = true;
    }
    // const duration = Math.ceil(readingTime(articles.article.content).minutes);
    // setReadingTimeText(`Approximately ${duration} minute${duration === 1 ? '' : 's'}`);
  };
  const hydrateTemplate = async (): Promise<void> => {
    const templates = await getStation().articles().templates().index(parseInt(id));
    // stationCtx.setTemplates(templates.template);
    dispatch({ type: ACTION_TYPE.SET_TEMPLATES, payload: templates.template });
  };

  useEffect(() => {
    refresh && navigate('/Station');
  }, [refresh]);

  useEffect(() => {
    hydrateTemplate();
    hydrateArticle();
    // hydrateTags();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [id]);
  return (
    <>
      {article && (
        <>
          {/* <div
            className={`fade ${
              stationCtx.swipeDirection === 'right'
                ? 'fade-right-move'
                : stationCtx.swipeDirection === 'left'
                ? 'fade-left-move'
                : ''
            }`}
          > */}
          {/* <div> */}
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname} // Triggers animation on route change
              initial={{ opacity: 0, x: swipeDirection === 'left' ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: swipeDirection === 'left' ? -100 : 100, // Use the previous direction for exit
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Breadcrumbs />
              <article className="article" data-component="article">
                <div>
                  <div className="page-header">
                    <div className="page-header-gradient"></div>
                    <div className="container">
                      <div className="row row--center">
                        <div className="column-12 column-768-12">
                          <h1 className="headline-01">{article.article.title}</h1>
                          <div className="grey-loading">
                            <div className="page-meta">
                              <div>
                                <strong>Juristiction</strong>
                                <br />

                                <JurisdictionList jurisdictions={article.jurisdictions} />
                              </div>
                              <div>
                                <strong>Article Preview Date</strong>
                                <br />
                                <span>{formatDate(new Date(article.article.reviewed_at))}</span>
                              </div>
                              <div>
                                <strong>Reading Time</strong>
                                <br />
                                <span id="preview-reading-time">{readingTimeText}</span>
                              </div>
                            </div>
                          </div>
                          {selectedGuide !== null && selectedGuide > -1 && (
                            <div className="grey-loading">
                              <div className="page-meta">
                                <div>
                                  <strong>
                                    <GuideBreadcrumb />
                                  </strong>

                                  <GuideList
                                    guides={article.sequences?.length ? article.sequences[0].sequence_articles : null}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                          <nav className="nav article-actions">
                            <ul className="button-group">
                              <li>
                                <button title="Print" className="icon-button">
                                  <span className="list-icon">
                                    <i className="fa fa-print"></i>
                                  </span>
                                </button>
                              </li>
                              <li>
                                {/* <button title="Favourite" className="icon-button">
                                  <span className="list-icon">
                                    <i className="fa fa-star"></i>
                                  </span>
                                </button> */}
                                <FavouriteButton id={article.article.id} />
                              </li>
                              <li>
                                <button title="Push to User" className="icon-button">
                                  <span className="list-icon">
                                    <i className="fa fa-bullhorn"></i>
                                  </span>
                                </button>
                              </li>
                              <li>
                                <a
                                  className="icon-button"
                                  target="_blank"
                                  href="/admin/articles/1560/edit"
                                  title="Edit"
                                >
                                  <span className="list-icon">
                                    <i className="fa fa-edit"></i>
                                  </span>
                                </a>
                              </li>
                              <li>
                                <button title="Clone" className="icon-button">
                                  <span className="list-icon">
                                    <i className="fa fa-clone"></i>
                                  </span>
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container page-body">
                    <section className="row row-reverse" style={{ justifyContent: 'space-between' }}>
                      <div className="columns-12 column-256-12 column-568-12 column-768-12 column-1024-6 column-1280-6">
                        <div className="article-content">
                          <div dangerouslySetInnerHTML={{ __html: article.article.content }} />
                        </div>
                      </div>
                      <div className="columns-12 column-256-12 column-568-12 column-768-12 column-1024-6 column-1280-6">
                        {/* <div className="article-content"> */}
                        <TemplateList />
                        <SectorBreadcrumb />
                        <TagsList tags={article.tags} />
                        {/* <TagsList articleId={parseInt(id)} /> */}
                        {/* </div> */}
                        <RelatedArticleList articleId={parseInt(id)} />
                      </div>
                    </section>
                  </div>
                </div>
              </article>
            </motion.div>
          </AnimatePresence>
          {/* </div> */}
        </>
      )}
    </>
  );
};

export default Library;
