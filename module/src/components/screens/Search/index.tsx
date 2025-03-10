import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';
import getStation from '../../../utils/getStation';
import { useNavigate } from 'react-router-dom';
import TitleContainer from '../../common/TitleContainer';
import { getTitleById } from '../../../helpers/helpers';
import DescriptionContainer from '../../common/DescriptionContainer';
import EaseInWrapper from '../../common/Animation/EaseInWrapper';
import usePageReset from '../../../hooks/usePageReset';
import { searchFunction } from '../../../utils/searchService';
import SkeletonLoader from '../../common/SkeletonLoader';
import { format, parseISO } from 'date-fns';

const FILTERS = {
  ARTICLE: 'article',
  TEMPLATE: 'article_template',
  SEQUENCE: 'sequence',
};

const Search: React.FC = ({ refresh }) => {
  const stationCtx = useStationContext();
  // const { id } = useParams();
  // usePageReset(id);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{ article?: boolean; sequence?: boolean; article_template?: boolean }>({});
  const [results, setResults] = useState<{ id: string; title: string; path: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);

      try {
        const term = searchParams.get('term') || '';
        const filterOptions = searchParams.get('filters')?.split(',').filter(Boolean) || [];
        const enableAllFilters = filterOptions.length === 0;

        const newFilters = {
          article: enableAllFilters || filterOptions.includes(FILTERS.ARTICLE),
          sequence: enableAllFilters || filterOptions.includes(FILTERS.SEQUENCE),
          article_template: enableAllFilters || filterOptions.includes(FILTERS.TEMPLATE),
        };

        setSearchTerm(term);
        setFilters(newFilters);

        // Await the search function
        const searchResults = await searchFunction(term, newFilters);
        setResults(searchResults);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [searchParams]);

  useEffect(() => {
    refresh && navigate('/Station');
  }, [refresh]);

  return (
    <>
      <EaseInWrapper>
        {/* <TitleContainer categories={stationCtx.savedGuides} id={parseInt(id)} />
        <DescriptionContainer categories={stationCtx.savedGuides} id={parseInt(id)} /> */}

        <div className="container tile-list">
          <h2>Search Results for {searchTerm}</h2>
        </div>
        <div className="container tile-list">
          {loading ? (
            <SkeletonLoader />
          ) : (
            results.map((item) => (
              <>
                <Link
                  to={`/station/library/${item.id}`}
                  key={`article${item.id}`}
                  className={'tile tile--350 tile--link-title-underline tile--white article flex-column'}
                >
                  <div className="tile-contents">
                    <h2>{item.title}</h2>
                    <div className="subtext my-s">{item.excerpt}</div>
                    {item.updated_at && (
                      <div className="subtext fs--s">
                        <span style={{ paddingBottom: '1rem' }}>
                          Last Updated: {format(parseISO(item.updated_at), 'do MMM, yyyy')}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </>
            ))
          )}
        </div>
      </EaseInWrapper>
    </>
  );
};

export default Search;
