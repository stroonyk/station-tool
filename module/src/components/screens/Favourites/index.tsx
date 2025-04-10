import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../../common/SkeletonLoader';
import TitleContainer from '../../common/TitleContainer';
import DescriptionContainer from '../../common/DescriptionContainer';
import EaseInWrapper from '../../common/Animation/EaseInWrapper';
import usePageReset from '../../../hooks/usePageReset';

interface IFavouritesProps {
  refresh: boolean;
}
const Favourites = ({ refresh }: IFavouritesProps) => {
  const { basePath, savedSectors, savedArticles } = useStationContext();
  const { id } = useParams();
  usePageReset(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // const hydrateFavourites = async (): Promise<void> => {
  //   const sectors = await getStation().sectors().articles().index(parseInt(id));
  //   const sectorList = sectors.article.map(({ id, title, excerpt }) => ({ id, title, excerpt }));
  //   stationCtx.setArticles(sectorList, id, ARTICLES_TYPE.CATEGORY);
  //   setLoading(false);
  // };
  useEffect(() => {
    refresh && navigate('/Station');
  }, [refresh]);

  // useEffect(() => {
  //   if (!stationCtx.savedArticles.articles || stationCtx.savedArticles.id !== id) {
  //     setLoading(true);
  //     hydrateFavourites();
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
                <>
                  <Link
                    to={`${basePath}/library/${item.id}`}
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

export default Favourites;
