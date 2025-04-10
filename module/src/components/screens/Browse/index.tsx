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

  useEffect(() => {
    refresh && navigate('/Station');
  }, [refresh]);

  const loadMore = () => {
    const fetchArticles = async () => {
      setLoading(true);
      const returnList = await getArticles(stationSDK, page + 1);
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
          list = await getArticles(stationSDK, page);
          setList(list);
          break;
        case 'guide':
          setList(stationCtx.savedGuides);
          break;
        case 'template':
          list = await getTemplates(stationSDK, 1);
          setList(list);
          break;
      }
      setLoading(false);
    };

    fetchList();
  }, [selected, stationCtx.savedCategories, stationCtx.savedSectors, stationCtx.savedGuides]);

  useEffect(() => {
    const setFavourites = async () => {
      switch (selected) {
        case 'favourite':
          setList(stationCtx.savedFavourites);
          break;
      }
    };
    setFavourites();
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
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [selected, loading]);

  const sortList = (listToSort: any[], sortBy: string, sortDirection: string) => {
    return listToSort.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (sortBy === 'updated_at') {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }

      return sortDirection === 'asc'
        ? valA.toString().localeCompare(valB.toString())
        : valB.toString().localeCompare(valA.toString());
    });
  };

  const sortClicked = (sortBy: string, sortDirection: string) => {
    const sortedList = sortList([...list], sortBy, sortDirection);
    setList(sortedList);
  };

  return (
    <>
      <EaseInWrapper>
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
      </EaseInWrapper>
    </>
  );
};

export default Browse;
