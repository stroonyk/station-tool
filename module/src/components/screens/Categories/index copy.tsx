import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, useParams } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';
import getStation from '../../../utils/getStation';
import { format, parseISO } from 'date-fns';
import { ARTICLES_TYPE } from '../../../store/stationReducer';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../../common/SkeletonLoader';

const CategoryPage = ({ refresh }) => {
  const stationCtx = useStationContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const hydrateCategories = async (): Promise<void> => {
    const articles = await getStation().categories().articles().index(parseInt(id));
    stationCtx.setArticles(articles.article, id, ARTICLES_TYPE.CATEGORY);
    setLoading(false);
  };

  useEffect(() => {
    refresh && navigate('/Station');
  }, [refresh]);

  useEffect(() => {
    if (!stationCtx.savedArticles.articles || stationCtx.savedArticles.id !== id) {
      setLoading(true);
      hydrateCategories();
    }
    stationCtx.setSelectedCategory(parseInt(id));
    stationCtx.setSelectedGuide(-1);
    stationCtx.setSelectedSector(-1);
  }, [id]);

  return (
    <div className="container tile-list">
      {!stationCtx.savedArticles.articles ||
        (stationCtx.savedArticles.id !== id && (
          <>
            <SkeletonLoader />
          </>
        ))}
      {stationCtx.savedArticles.articles &&
        stationCtx.savedArticles.id === id &&
        stationCtx.savedArticles.articles.map((article, index) => {
          return (
            <>
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
            </>
          );
        })}
    </div>
  );
};

export default CategoryPage;
