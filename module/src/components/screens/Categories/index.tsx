import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IArticlesType } from '../../../store/stationReducer';
import { useStationContext } from '../../../store/station-context';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../../common/SkeletonLoader';
import TitleContainer from '../../common/TitleContainer';
import DescriptionContainer from '../../common/DescriptionContainer';
import EaseInWrapper from '../../common/Animation/EaseInWrapper';
import usePageReset from '../../../hooks/usePageReset';
import CardComponent from '../../common/CardComponent';

interface ICategoryProps {
  refresh: boolean;
}
const CategoryPage = ({ refresh }: ICategoryProps) => {
  const { loading, hydrateCategoriesPage, savedArticles, dispatch } = useStationContext();
  const { id } = useParams();
  usePageReset(id);
  const idInt = parseInt(id);
  const navigate = useNavigate();

  useEffect(() => {
    refresh && navigate('/Station');
  }, [refresh]);

  useEffect(() => {
    if (!savedArticles.articles || savedArticles.id !== idInt) {
      hydrateCategoriesPage(idInt);
    }
  }, [id]);

  return (
    <>
      <EaseInWrapper>
        <TitleContainer id={idInt} />
        <DescriptionContainer id={idInt} />

        <div className="container tile-list">
          {loading ? (
            <SkeletonLoader />
          ) : savedArticles.articles && savedArticles.id === idInt ? (
            savedArticles.articles.map((item: IArticlesType) => (
              <CardComponent key={item.id} item={item} path={'library'} />
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
