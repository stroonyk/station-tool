import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';
import getStation from '../../../utils/getStation';
import { ARTICLES_TYPE } from '../../../store/stationReducer';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../../common/SkeletonLoader';
import Breadcrumbs from '../../common/Breadcrumbs/Breadcrumbs';
import TitleContainer from '../../common/TitleContainer';
import { getTitleById } from '../../../helpers/helpers';
import DescriptionContainer from '../../common/DescriptionContainer';
import { AnimatePresence, motion } from 'framer-motion';
import EaseInWrapper from '../../common/Animation/EaseInWrapper';
import usePageReset from '../../../hooks/usePageReset';

const Tags = ({ refresh }) => {
  const stationCtx = useStationContext();
  const { id } = useParams();
    usePageReset(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [tag, setTag] = useState();

  const hydrateArticles = async (): Promise<void> => {
    const articles = await getStation().tags().articles().index(parseInt(id));
    const articleList = articles.article.map(({ id, title, excerpt }) => ({ id, title, excerpt }));
    setArticles(articleList);
    setLoading(false);
  };
  const hydrateTag = async (): Promise<void> => {
    const tag = await getStation().tags().get(parseInt(id));
    // debugger;
    setTag(tag.tag);
  };

  useEffect(() => {
    refresh && navigate('/Station');
  }, [refresh]);

  useEffect(() => {
    hydrateArticles();
    hydrateTag();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    stationCtx.setSelectedSector(parseInt(id));
    stationCtx.setSelectedCategory(-1);
    stationCtx.setSelectedGuide(-1);
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
            // Show skeleton loader when loading is true
            <SkeletonLoader />
          ) : (
            articles &&
            articles.map((item, index) => {
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

export default Tags;
