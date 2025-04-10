import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../../common/SkeletonLoader';
import EaseInWrapper from '../../common/Animation/EaseInWrapper';
import usePageReset from '../../../hooks/usePageReset';
import CardComponent from '../../common/CardComponent';

interface ITagsProps {
  refresh: boolean;
}
const Tags = ({ refresh }: ITagsProps) => {
  const { stationSDK } = useStationContext();
  const { id } = useParams();
  usePageReset(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [tag, setTag] = useState();

  const hydrateArticles = async (): Promise<void> => {
    const articles = await stationSDK.tags().articles().index(parseInt(id));
    const articleList = articles.article.map(({ id, title, excerpt }) => ({ id, title, excerpt }));
    setArticles(articleList);
    setLoading(false);
  };
  const hydrateTag = async (): Promise<void> => {
    const tag = await stationSDK.tags().get(parseInt(id));
    // debugger;
    setTag(tag.tag);
  };

  useEffect(() => {
    refresh && navigate('/Station');
  }, [refresh]);

  useEffect(() => {
    hydrateArticles();
    hydrateTag();
  }, [id]);

  return (
    <>
      <EaseInWrapper>
        {tag && (
          <>
            <h1 className="container">{tag.title}</h1>
            <h2 style={{ marginTop: '20px', marginBottom: '0px' }} className="container">
              Articles with this tag:
            </h2>
          </>
        )}
        <div className="container tile-list">
          {loading ? (
            <SkeletonLoader />
          ) : (
            articles &&
            articles.map((item, index) => {
              return <CardComponent key={item.id} item={item} path={'library'} favourite={true} />;
            })
          )}
        </div>
      </EaseInWrapper>
    </>
  );
};

export default Tags;
