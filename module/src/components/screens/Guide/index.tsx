import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';
import getStation from '../../../utils/getStation';
import { useNavigate } from 'react-router-dom';
import TitleContainer from '../../common/TitleContainer';
import { formatDate, getTitleById } from '../../../helpers/helpers';
import DescriptionContainer from '../../common/DescriptionContainer';
import EaseInWrapper from '../../common/Animation/EaseInWrapper';
import usePageReset from '../../../hooks/usePageReset';
import FavouriteButton from '../../common/FavouriteButton';

const Guide = ({ refresh }) => {
  const { savedGuides, basePath } = useStationContext();
  const { id } = useParams();
  usePageReset(id);
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  const hydrateGuide = async (): Promise<void> => {
    const sequence = await getStation().sequences().get(parseInt(id));
    const articleList = sequence.sequence.sequence_articles;
    setArticles(articleList);
  };
  useEffect(() => {
    refresh && navigate('/Station');
  }, [refresh]);

  useEffect(() => {
    hydrateGuide();
  }, [id]);

  return (
    <>
      <EaseInWrapper>
        <TitleContainer categories={savedGuides} id={parseInt(id)} />
        <DescriptionContainer categories={savedGuides} id={parseInt(id)} />

        <div className="container tile-list">
          {articles &&
            articles.map((item, index) => {
              return (
                <Link
                  to={`${basePath}/library/${item.article.id}`}
                  key={`guide${index}`}
                  className={'tile tile--350 tile--link-title-underline tile--white article flex-column'}
                >
                  <div className="tile-contents">
                    <h2>{item.article.title}</h2>
                    <div className="subtext my-s">{item.article.excerpt}</div>
                    <div className="subtext fs--s mt-auto">
                      API Needs article date
                      <div className="button-group article-actions">
                        <FavouriteButton id={item.article.id} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </EaseInWrapper>
    </>
  );
};

export default Guide;
