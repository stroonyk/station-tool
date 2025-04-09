import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, useParams } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';
import getStation from '../../../utils/getStation';
import { format, parseISO } from 'date-fns';
import { ACTION_TYPE, ARTICLES_TYPE } from '../../../store/stationReducer';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../../common/SkeletonLoader';
import Breadcrumbs from '../../common/Breadcrumbs/Breadcrumbs';
import { getDescriptionById, getTitleById } from '../../../helpers/helpers';
import TitleContainer from '../../common/TitleContainer';
import DescriptionContainer from '../../common/DescriptionContainer';
import EaseInWrapper from '../../common/Animation/EaseInWrapper';
import usePageReset from '../../../hooks/usePageReset';
import FavouriteButton from '../../common/FavouriteButton';

const CategoryPage = ({ refresh }) => {
  const { basePath, savedArticles, savedCategories, dispatch } = useStationContext();
  const stationCtx = useStationContext();
  const { id } = useParams();
  usePageReset(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const hydrateCategories = async (): Promise<void> => {
    const articles = await getStation().categories().articles().index(parseInt(id));
    dispatch({
      type: ACTION_TYPE.SET_ARTICLES,
      payload: {
        articles: articles.article,
        id: id,
        articlesType: ARTICLES_TYPE.CATEGORY,
      },
    });
    setLoading(false);
  };

  useEffect(() => {
    refresh && navigate('/Station');
  }, [refresh]);

  useEffect(() => {
    if (!savedArticles.articles || savedArticles.id !== id) {
      setLoading(true);
      hydrateCategories();
    }
  }, [id]);

  return (
    <>
      <EaseInWrapper>
        <TitleContainer categories={savedCategories} id={parseInt(id, 10)} />
        <DescriptionContainer categories={savedCategories} id={parseInt(id, 10)} />

        {/* <DescriptionContainer>{getDescriptionById(stationCtx.savedCategories, parseInt(id))}</DescriptionContainer> */}
        <div className="container tile-list">
          {loading ? (
            // Show skeleton loader when loading is true
            <SkeletonLoader />
          ) : savedArticles.articles && savedArticles.id === id ? (
            // Show actual articles when not loading and data is available
            savedArticles.articles.map((article) => (
              <Link
                to={`${basePath}/library/${article.id}`}
                key={article.id}
                className={'tile tile--350 tile--link-title-underline tile--white article flex-column'}
              >
                <div className="tile-contents">
                  <h2>{article.title}</h2>
                  <div className="subtext my-s">{article.summary}</div>
                  <div className="subtext fs--s mt-auto">
                    {article.reviewed_at && (
                      <div className="subtext fs--s">
                        <span style={{ paddingBottom: '1rem' }}>
                          {/* Last Updated:  */}
                          {format(parseISO(article.reviewed_at), 'do MMM, yyyy')}
                        </span>
                      </div>
                    )}
                    <div className="button-group article-actions">
                      <FavouriteButton id={article.id} />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div>No Articles Found</div>
          )}
        </div>
      </EaseInWrapper>
    </>
  );
};

export default CategoryPage;
