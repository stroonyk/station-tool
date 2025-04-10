import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';
import { useNavigate } from 'react-router-dom';
import TitleContainer from '../../common/TitleContainer';
import DescriptionContainer from '../../common/DescriptionContainer';
import EaseInWrapper from '../../common/Animation/EaseInWrapper';
import usePageReset from '../../../hooks/usePageReset';
import CardComponent from '../../common/CardComponent';

interface IGuideProps {
  refresh: boolean;
}
const Guide = ({ refresh }: IGuideProps) => {
  const { id } = useParams();
  const idInt = parseInt(id);
  usePageReset(id);
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const { stationSDK } = useStationContext();
  const hydrateGuide = async (): Promise<void> => {
    const sequence = await stationSDK.sequences().get(parseInt(id));
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
        <TitleContainer id={idInt} />
        <DescriptionContainer id={idInt} />

        <div className="container tile-list">
          {articles &&
            articles.map((item, index) => {
              return <CardComponent key={item.article.id} item={item.article} path={`library`} favourite={true} />;
            })}
        </div>
      </EaseInWrapper>
    </>
  );
};

export default Guide;
