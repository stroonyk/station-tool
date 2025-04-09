import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';
import { ACTION_TYPE, ARTICLES_TYPE } from '../../../store/stationReducer';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../../common/SkeletonLoader';
import TitleContainer from '../../common/TitleContainer';
import { formatDate, getSectors } from '../../../helpers/helpers';
import DescriptionContainer from '../../common/DescriptionContainer';
import EaseInWrapper from '../../common/Animation/EaseInWrapper';
import usePageReset from '../../../hooks/usePageReset';
import FavouriteButton from '../../common/FavouriteButton';

const Sectors = ({ refresh }) => {
  const { savedArticles, savedSectors, basePath, dispatch } = useStationContext();

  const { id } = useParams();
  const navigate = useNavigate();
  usePageReset(id);
  const [loading, setLoading] = useState(false);

  // const hydrateSectors = async (): Promise<void> => {
  //   const sectors = await getStation().sectors().articles().index(parseInt(id));
  //   const sectorList = sectors.article.map(({ id, title, excerpt }) => ({ id, title, excerpt }));
  //   stationCtx.setArticles(sectorList, id, ARTICLES_TYPE.CATEGORY);
  //   setLoading(false);
  // };
  useEffect(() => {
    refresh && navigate('/Station');
  }, [refresh]);

  useEffect(() => {
    const fetchList = async () => {
      if (!savedArticles.articles || savedArticles.id !== id) {
        setLoading(true);
        const list = await getSectors(parseInt(id));
        // stationCtx.setArticles(list, id, ARTICLES_TYPE.CATEGORY);
        dispatch({
          type: ACTION_TYPE.SET_ARTICLES,
          payload: { articles: list, id: id, articlesType: ARTICLES_TYPE.CATEGORY },
        });
        setLoading(false);
      }
    };

    fetchList();
  }, [id]);

  // useEffect(() => {
  //   if (!stationCtx.savedArticles.articles || stationCtx.savedArticles.id !== id) {
  //     setLoading(true);
  //     hydrateSectors();
  //   }
  // }, [id]);

  return (
    <>
      <EaseInWrapper>
        <TitleContainer categories={savedSectors} id={parseInt(id)} />
        <DescriptionContainer categories={savedSectors} id={parseInt(id)} />
        <div className="container tile-list">
          {loading ? (
            // Show skeleton loader when loading is true
            <SkeletonLoader />
          ) : (
            savedArticles.articles &&
            savedArticles.id === id &&
            savedArticles.articles.map((item, index) => {
              return (
                <Link
                  to={`${basePath}/library/${item.id}`}
                  key={`sectors${item.id}`}
                  className={'tile tile--350 tile--link-title-underline tile--white article flex-column'}
                >
                  <div className="tile-contents">
                    <h2>{item.title}</h2>
                    <div className="subtext my-s">{item.excerpt}</div>
                    <div className="subtext fs--s mt-auto">
                      {formatDate(new Date(item.updated_at))}

                      <div className="button-group article-actions">
                        <FavouriteButton id={item.id} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </EaseInWrapper>
    </>
  );
};

export default Sectors;
