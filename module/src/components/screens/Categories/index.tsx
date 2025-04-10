import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IArticlesType } from '../../../store/stationReducer';
import { useStationContext } from '../../../store/station-context';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../../common/SkeletonLoader';
import TitleContainer from '../../common/TitleContainer';
import DescriptionContainer from '../../common/DescriptionContainer';
import EaseInWrapper from '../../common/Animation/EaseInWrapper';
import usePageReset from '../../../hooks/usePageReset';
import FavouriteButton from '../../common/FavouriteButton';
import CardComponent from '../../common/CardComponent';
import { getDynamicValueById } from '../../../helpers/helpers';

interface ICategoryProps {
  refresh: boolean;
}
const CategoryPage = ({ refresh }: ICategoryProps) => {
  const { loading, hydrateCategoriesPage, basePath, savedArticles, dispatch } = useStationContext();
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
              // <Link
              //   to={`${basePath}/library/${article.id}`}
              //   key={article.id}
              //   className={'tile tile--350 tile--link-title-underline tile--white article flex-column'}
              // >
              //   <div className="tile-contents">
              //     <h2>{article.title}</h2>
              //     <div className="subtext my-s">{article.summary}</div>
              //     <div className="subtext fs--s mt-auto">
              //       {article.reviewed_at && (
              //         <div className="subtext fs--s">
              //           <span style={{ paddingBottom: '1rem' }}>
              //             {/* Last Updated:  */}
              //             {format(parseISO(article.reviewed_at), 'do MMM, yyyy')}
              //           </span>
              //         </div>
              //       )}
              //       <div className="button-group article-actions">
              //         <FavouriteButton id={article.id} />
              //       </div>
              //     </div>
              //   </div>
              // </Link>
              <CardComponent
                key={item.id}
                item={item}
                path={'library'}
                // favourite={selected === 'article' || selected === 'favourite'}
              />
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
