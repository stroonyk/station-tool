import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';
import { ARTICLES_TYPE } from '../../../store/stationReducer';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../../common/SkeletonLoader';
import TitleContainer from '../../common/TitleContainer';
import { getSectors } from '../../../helpers/helpers';
import DescriptionContainer from '../../common/DescriptionContainer';
import EaseInWrapper from '../../common/Animation/EaseInWrapper';
import usePageReset from '../../../hooks/usePageReset';

const Sectors = ({ refresh }) => {
  const stationCtx = useStationContext();

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
      if (!stationCtx.savedArticles.articles || stationCtx.savedArticles.id !== id) {
        setLoading(true);
        const list = await getSectors(parseInt(id));
        stationCtx.setArticles(list, id, ARTICLES_TYPE.CATEGORY);
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
        <TitleContainer categories={stationCtx.savedSectors} id={parseInt(id)} />
        <DescriptionContainer categories={stationCtx.savedSectors} id={parseInt(id)} />
        <div className="container tile-list">
          {loading ? (
            // Show skeleton loader when loading is true
            <SkeletonLoader />
          ) : (
            stationCtx.savedArticles.articles &&
            stationCtx.savedArticles.id === id &&
            stationCtx.savedArticles.articles.map((item, index) => {
              return (
                <>
                  <Link
                    to={`/station/library/${item.id}`}
                    key={`sectors${item.id}`}
                    className={'tile tile--350 tile--link-title-underline tile--white article flex-column'}
                  >
                    <div className="tile-contents">
                      <h2>{item.title}</h2>
                      <div className="subtext my-s">{item.excerpt}</div>
                      <div className="subtext fs--s mt-auto" />
                    </div>
                  </Link>
                </>
              );
            })
          )}
        </div>
      </EaseInWrapper>
    </>
  );
};

export default Sectors;
