import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import { useStationContext } from '../../store/station-context';

export interface IRelatedArticlesProps {
  articleId: number;
}
const RelatedArticleList: React.FC<IRelatedArticlesProps> = ({ articleId }) => {
  const { stationSDK } = useStationContext();
  const [articles, setArticles] = useState([]);
  const { basePath } = useStationContext();

  const hydrateRelatedArticles = async (): Promise<void> => {
    const articles = await stationSDK.articles().related().index(articleId);
    const articleList = articles.relation.map(({ id, title }) => ({
      id,
      title,
    }));
    setArticles(articleList);
  };
  useEffect(() => {
    hydrateRelatedArticles();
  }, [articleId]);
  return (
    <>
      {articles && articles.length > 0 && (
        <div className="mini-related-container">
          <span className="mini-related-title">Related Articles</span>
          <div className="mini-related-cards">
            {articles.map(({ id, title }) => (
              <Link to={`${basePath}/Library/${id}`} key={id} className="mini-related-card">
                <span className="related-title">{title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedArticleList;
