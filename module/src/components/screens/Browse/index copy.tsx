import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../../common/SkeletonLoader';
import { getDynamicValueById } from '../../../helpers/helpers';
import { getArticles, getTemplates } from '../../../services/station';
import EaseInWrapper from '../../common/Animation/EaseInWrapper';
import usePageReset from '../../../hooks/usePageReset';
import Header from './Components/Header';
import CardComponent from '../../common/CardComponent';
import { browseByItems } from './Components/config';
import { sortList } from '../../../helpers/sortList';

export interface IBrowseProps {
  refresh: boolean;
}

const Browse = ({ refresh }: IBrowseProps) => {
  const stationCtx = useStationContext();
  const { stationSDK } = useStationContext();
  const { id } = useParams();
  usePageReset(id);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   refresh && navigate('/Station');
  // }, [refresh]);

  // const loadMore = () => {
  //   const fetchArticles = async () => {
  //     setLoading(true);
  //     const returnList = await getArticles(stationSDK, page + 1);
  //     setList((prevList) => [...prevList, ...returnList]);
  //     setLoading(false);
  //   };
  //   fetchArticles();
  //   setPage((page) => page + 1);
  // };

  // useEffect(() => {
  //   let list = [];
  //   setPage(1);
  //   setLoading(true);
  //   const fetchList = async () => {
  //     switch (selected) {
  //       case 'category':
  //         setList(stationCtx.savedCategories);
  //         break;
  //       case 'sector':
  //         setList(stationCtx.savedSectors);
  //         break;
  //       case 'article':
  //         list = await getArticles(stationSDK, page);
  //         setList(list);
  //         break;
  //       case 'guide':
  //         setList(stationCtx.savedGuides);
  //         break;
  //       case 'template':
  //         list = await getTemplates(stationSDK, 1);
  //         setList(list);
  //         break;
  //     }
  //     setLoading(false);
  //   };

  //   fetchList();
  // }, [selected, stationCtx.savedCategories, stationCtx.savedSectors, stationCtx.savedGuides]);

  // useEffect(() => {
  //   const setFavourites = async () => {
  //     switch (selected) {
  //       case 'favourite':
  //         setList(stationCtx.savedFavourites);
  //         break;
  //     }
  //   };
  //   setFavourites();
  // }, [selected, stationCtx.savedFavourites]);

  // useEffect(() => {
  //   const slug = searchParams.get('by');
  //   setSelected(slug || 'category');
  // }, [searchParams.get('by')]);

  // useEffect(() => {
  //   if (selected === 'article') {
  //     console.log('in selected===article');
  //     const handleScroll = () => {
  //       console.log('in handle scroll');
  //       const scrollPosition = window.scrollY + window.innerHeight;
  //       const bottomPosition = document.documentElement.scrollHeight;

  //       if (scrollPosition >= bottomPosition - 100 && !loading) {
  //         loadMore();
  //       }
  //     };
  //     window.addEventListener('scroll', handleScroll);
  //     return () => {
  //       console.log('remove listener');
  //       window.removeEventListener('scroll', handleScroll);
  //     };
  //   }
  // }, [selected, loading]);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      alert('bob');
    });
  }, []);
  // const sortClicked = (sortBy: string, sortDirection: string) => {
  //   const sortedList = sortList([...list], sortBy, sortDirection);
  //   setList(sortedList);
  // };

  return (
    <>
      <div style={{ height: '200vh' }}>Scroll me!</div>
      {/* <EaseInWrapper>
        <Header selected={selected} sortClicked={sortClicked} />

        <div className="container tile-list">
          {loading ? (
            <SkeletonLoader />
          ) : (
            list.length > 0 &&
            list.map((item, index) => (
              <CardComponent
                isTemplate={selected === 'template'}
                templateId={item.id}
                key={item.id}
                item={item}
                path={getDynamicValueById(browseByItems, selected, 'url')}
                favourite={selected === 'article' || selected === 'favourite'}
              />
            ))
          )}
        </div>
      </EaseInWrapper> */}
    </>
  );
};

export default Browse;
