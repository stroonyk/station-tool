import { Link, useParams } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';
import { useEffect, useState } from 'react';
import MainContentLayout from '../../layouts/MainContentLayout';
import readingTime from 'reading-time';

import { useMediaQuery } from 'react-responsive';
import getStation from '../../../utils/getStation';
import CustomDropdown from '../../common/CustomDropdown';
import { useNavigate } from 'react-router-dom';
import Filters from '../../common/Filters';
import Breadcrumb from '../../common/Breadcrumbs/Breadcrumbs';
const formatDate = (date) => {
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const Library_old = ({ refresh }) => {
  const navigate = useNavigate();
  const stationCtx = useStationContext();
  const { id } = useParams();
  const isSmallerScreen = useMediaQuery({
    query: '(min-width: 1200px)',
  });
  const [article, setArticle] = useState();
  const [readingTimeText, setReadingTimeText] = useState('');

  const hydrateArticle = async (): Promise<void> => {
    // const { article } = await getStation().articles().index();
    const articles = await getStation().articles().get(parseInt(id), { with_meta: true });
    // debugger;
    setArticle(articles.article);
    const duration = Math.ceil(readingTime(articles.article.content).minutes);
    setReadingTimeText(`Approximately ${duration} minute${duration === 1 ? '' : 's'}`);
  };
  useEffect(() => {
    refresh && navigate('/Station');
  }, [refresh]);

  useEffect(() => {
    hydrateArticle();
  }, []);
  // useEffect(() => {}, [article]);

  // debugger;
  // console.log(article);
  // debugger;
  return (
    <>
      {article && (
        <MainContentLayout background="pearl">
          <Breadcrumb categoryIds={article.category_ids} />
          <Filters
            selectedCategory={article.category_ids?.[0] || null}
            selectedCategory={article.category_ids?.[0] || null}
          />
          <article className="article" data-component="article">
            <div>
              <div className="page-header">
                <div className="page-header-gradient"></div>
                <div className="container">
                  <div className="row row--center">
                    <div className="column-12 column-768-12">
                      <h1 className="headline-01">{article.title}</h1>
                      <div className="grey-loading">
                        <div className="page-meta">
                          <div>
                            <strong>Article Preview Date</strong>
                            <br />
                            <span>{formatDate(new Date(article.reviewed_at))}</span>
                          </div>
                          <div>
                            <strong>Reading Time</strong>
                            <br />
                            <span id="preview-reading-time">{readingTimeText}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container page-body">
                <section className="row row-reverse" style={{ justifyContent: 'space-between' }}>
                  <div className="columns-12 column-256-12 column-568-12 column-768-12 column-1024-6 column-1280-6">
                    <div className="article-content">
                      <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </article>
        </MainContentLayout>
      )}
    </>
  );
};

export default Library_old;
