import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';
import { ACTION_TYPE, ARTICLES_TYPE } from '../../../store/stationReducer';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../../common/SkeletonLoader';
import TitleContainer from '../../common/TitleContainer';
import { getSectorArticles } from '../../../services/station';
import DescriptionContainer from '../../common/DescriptionContainer';
import EaseInWrapper from '../../common/Animation/EaseInWrapper';
import usePageReset from '../../../hooks/usePageReset';
import CardComponent from '../../common/CardComponent';

interface ISectorsProps {
  refresh: boolean;
}

const Sectors = ({ refresh }: ISectorsProps) => {
  const { stationSDK, savedArticles, dispatch } = useStationContext();

  const { id } = useParams();
  const idInt = parseInt(id);
  const navigate = useNavigate();
  usePageReset(id);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refresh && navigate('/Station');
  }, [refresh]);

  useEffect(() => {
    const fetchList = async () => {
      if (!savedArticles.articles || savedArticles.id !== idInt) {
        setLoading(true);
        const list = await getSectorArticles(stationSDK, idInt);
        dispatch({
          type: ACTION_TYPE.SET_ARTICLES,
          payload: { articles: list, id: id, articlesType: ARTICLES_TYPE.CATEGORY },
        });
        setLoading(false);
      }
    };

    fetchList();
  }, [id]);

  return (
    <>
      <EaseInWrapper>
        <TitleContainer id={parseInt(id)} />
        <DescriptionContainer id={parseInt(id)} />
        <div className="container tile-list">
          {loading ? (
            // Show skeleton loader when loading is true
            <SkeletonLoader />
          ) : (
            savedArticles.articles &&
            savedArticles.id === id &&
            savedArticles.articles.map((item, index) => {
              return <CardComponent key={item.id} item={item} path={'library'} favourite={true} />;
            })
          )}
        </div>
      </EaseInWrapper>
    </>
  );
};

export default Sectors;
