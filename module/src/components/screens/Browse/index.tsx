import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';
import getStation from '../../../utils/getStation';
import { ARTICLES_TYPE } from '../../../store/stationReducer';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../../common/SkeletonLoader';
import Breadcrumbs from '../../common/Breadcrumbs/Breadcrumbs';
import TitleContainer from '../../common/TitleContainer';
import { getArticles, getTemplates } from '../../../helpers/helpers';
import EaseInWrapper from '../../common/Animation/EaseInWrapper';
import usePageReset from '../../../hooks/usePageReset';
import { browseByItems } from './config'; // Adjust the import path if necessary

import Header from './Header';
import CardComponent from '../../common/CardComponent';

const Browse = ({ refresh }) => {
  const stationCtx = useStationContext();
  const { id } = useParams();
  usePageReset(id);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(true);
  // const byParam = useMemo(() => searchParams.get('by'), [searchParams]);
  // const loadMoreRef = useRef(null);

  const [page, setPage] = useState(1);

  useEffect(() => {
    refresh && navigate('/Station');
  }, [refresh]);

  const loadMore = () => {
    const fetchArticles = async () => {
      setLoading(true);
      const returnList = await getArticles(page + 1);
      setList((prevList) => [...prevList, ...returnList]);
      setLoading(false);
    };
    fetchArticles();
    setPage((page) => page + 1);
  };

  useEffect(() => {
    let list = [];
    setPage(1);
    setLoading(true);
    const fetchList = async () => {
      switch (selected) {
        case 'category':
          setList(stationCtx.savedCategories);
          break;
        case 'sector':
          setList(stationCtx.savedSectors);
          break;
        case 'article':
          list = await getArticles(page);
          setList(list);
          break;
        case 'guide':
          setList(stationCtx.savedGuides);
          break;
        case 'template':
          list = await getTemplates(1);
          setList(list);
          break;
      }
      setLoading(false);
    };

    fetchList();
  }, [selected, stationCtx.savedCategories, stationCtx.savedSectors, stationCtx.savedGuides]);

  useEffect(() => {
    const fetchTemplates = async () => {
      switch (selected) {
        case 'favourite':
          setList(stationCtx.savedFavourites);
          break;
      }
    };
    fetchTemplates();
  }, [selected, stationCtx.savedFavourites]);

  useEffect(() => {
    const slug = searchParams.get('by');
    console.log('slug is ' + slug);
    setSelected(slug || 'category');
  }, [searchParams.get('by')]);

  useEffect(() => {
    if (selected === 'article') {
      const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const bottomPosition = document.documentElement.scrollHeight;

        if (scrollPosition >= bottomPosition - 100 && !loading) {
          loadMore();
        }
      };

      window.addEventListener('scroll', handleScroll);

      // Cleanup on component unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [selected, loading]);

  return (
    <>
      <EaseInWrapper>
        <Header selected={selected} items={browseByItems} />

        <div className="container tile-list">
          {loading ? (
            <SkeletonLoader />
          ) : (
            list.length > 0 &&
            list.map((item, index) => (
              <CardComponent key={item.id} item={item} selected={selected} browseByItems={browseByItems} />
            ))
          )}
        </div>
        {/* {selected === 'article' && ( */}
        {/* <div ref={loadMoreRef} style={{ height: '10px' }}>
          bob
        </div> */}
        {/* )}*/}
      </EaseInWrapper>
    </>
  );
};

export default Browse;
