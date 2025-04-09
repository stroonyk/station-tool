import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';
import getStation from '../../../utils/getStation';
import { useNavigate } from 'react-router-dom';
import TitleContainer from '../../common/TitleContainer';
import { formatDate, getTitleById } from '../../../helpers/helpers';
import DescriptionContainer from '../../common/DescriptionContainer';
import EaseInWrapper from '../../common/Animation/EaseInWrapper';
import usePageReset from '../../../hooks/usePageReset';
import { searchFunction } from '../../../utils/searchService';
import SkeletonLoader from '../../common/SkeletonLoader';
import { format, parseISO } from 'date-fns';
import CardComponent from '../../common/CardComponent';

const FILTERS = {
  ARTICLE: 'article',
  TEMPLATE: 'article_template',
  SEQUENCE: 'sequence',
};

const order = {
  article_template: 1,
  sequence: 2,
  article: 3,
};

const Search: React.FC = ({ refresh }) => {
  const stationCtx = useStationContext();
  // const { id } = useParams();
  // usePageReset(id);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{ article?: boolean; sequence?: boolean; article_template?: boolean }>({});
  const [results, setResults] = useState<
    { id: string; title: string; path: string; search_type: string; file_type: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [sequenceList, setSequenceList] = useState([]);
  const [articleList, setArticleList] = useState([]);
  const [templateList, setTemplateList] = useState([]);

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
        // const sortedResults = [...searchResults].sort(
        //   (a, b) => (order[a.search_type] ?? 99) - (order[b.search_type] ?? 99),
        // );
        const sequences = searchResults.filter((item) => item.search_type === 'sequence');
        const articles = searchResults.filter((item) => item.search_type === 'article');
        const templates = searchResults.filter((item) => item.search_type === 'article_template');

        // searchResults.map((item) => {
        //   // debugger;
        //   console.log('item source is ' + item.source);
        // });
        setSequenceList(sequences);
        setArticleList(articles);
        setTemplateList(templates);
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
            sequenceList.length > 0 &&
            sequenceList.map((item, index) => (
              <>
                guides!
                <Link
                  to={`/station/`}
                  key={`sectors${item.id}`}
                  className={'tile tile--350 tile--link-title-underline tile--white article flex-column'}
                >
                  <div className="tile-contents">
                    <div className="tile-header">
                      <div className="title">
                        <h3>{item.title}</h3>
                      </div>
                    </div>

                    <div
                      className="subtext my-s"
                      dangerouslySetInnerHTML={{
                        __html: item.brief ?? item.description ?? item.summary ?? item.excerpt,
                      }}
                    />
                    <div className="subtext fs--s mt-auto">
                      {formatDate(new Date(item.updated_at))}
                    </div>
                  </div>
                </Link>
              </>
            ))
            // results.map((item) => (
            //   <>
            //     <Link
            //       to={`/station/library/${item.id}`}
            //       key={`article${item.id}`}
            //       className={'tile tile--350 tile--link-title-underline tile--white article flex-column'}
            //     >
            //       <div className="tile-contents">
            //         <h2>{item.title}</h2>
            //         <div className="subtext my-s">{item.excerpt}</div>
            //         {item.updated_at && (
            //           <div className="subtext fs--s">
            //             <span style={{ paddingBottom: '1rem' }}>
            //               {/* Last Updated:  */}
            //               {format(parseISO(item.updated_at), 'do MMM, yyyy')}
            //             </span>
            //           </div>
            //         )}
            //       </div>
            //     </Link>
            //   </>
            // ))
          )}
        </div>
      </EaseInWrapper>
    </>
  );
};

export default Search;
