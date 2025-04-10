import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';
import { useNavigate } from 'react-router-dom';
import EaseInWrapper from '../../common/Animation/EaseInWrapper';
import { searchFunction } from '../../../utils/searchService';
import SkeletonLoader from '../../common/SkeletonLoader';
import SearchItem from './SearchItem';
import { downloadTemplate, fileTypeIcons, formatDate } from '../../../helpers/helpers';
import { GuideIcon, ArticleIcon, TemplateIcon } from '../../../icons';

const FILTERS = {
  ARTICLE: 'article',
  TEMPLATE: 'article_template',
  SEQUENCE: 'sequence',
};

const Search: React.FC = ({ refresh }) => {
  // const { id } = useParams();
  // usePageReset(id);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{ article?: boolean; sequence?: boolean; article_template?: boolean }>({});
  // const [results, setResults] = useState<
  //   { id: string; title: string; path: string; search_type: string; file_type: string }[]
  // >([]);
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

        const searchResults = await searchFunction(term, newFilters);
        const sequences = searchResults.filter((item) => item.search_type === 'sequence');
        const articles = searchResults.filter((item) => item.search_type === 'article');
        const templates = searchResults.filter((item) => item.search_type === 'article_template');

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
          <h2 className="h2title">Search Results for {searchTerm}</h2>
        </div>
        {/* <div className="container tile-list"> */}
        {loading ? (
          <div className="container tile-list">
            <SkeletonLoader />
          </div>
        ) : (
          <>
            {/* Template List */}
            {templateList.length > 0 && (
              <>
                <div className="container tile-list">
                  <h3 className="h3title">
                    {' '}
                    <span className="list-icon" style={{ marginRight: '10px' }}>
                      <TemplateIcon />
                    </span>
                    Templates
                  </h3>
                </div>
                <div className="container tile-list template">
                  {templateList.map((item, index) => (
                    <a
                      key={`template${index}`}
                      className="tile tile--350 tile--link-title-underline tile--white article flex-column"
                      onClick={() => downloadTemplate(item.id.match(/\d+$/)?.[0])}
                    >
                      <div className="tile-contents">
                        <h2>{item.title}</h2>

                        <div className="subtext my-s">{item.description}</div>
                        <div className="subtext fs--s mt-auto">
                          {formatDate(new Date(item.updated_at))}
                          <span className="list-icon">
                            <i className={`fas ${fileTypeIcons[item.file_type] || 'fa-file'}`}></i>
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            )}
            {/* Sequence List */}
            {sequenceList.length > 0 && (
              <>
                <div className="container tile-list">
                  <h3 className="h3title">
                    <span className="list-icon" style={{ marginRight: '10px' }}>
                      <GuideIcon />
                    </span>
                    Guides
                  </h3>
                </div>
                <div className="container tile-list guides">
                  {sequenceList.map((item, index) => (
                    <SearchItem
                      path={'guides'}
                      blurb={item.excerpt}
                      id={item.id}
                      updated_at={item.updated_at}
                      title={item.title}
                      key={`guides${index}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Article List */}
            {articleList.length > 0 && (
              <>
                <div className="container tile-list">
                  <h3 className="h3title">
                    <span className="list-icon" style={{ marginRight: '10px' }}>
                      <ArticleIcon />
                    </span>
                    Articles
                  </h3>
                </div>
                <div className="container tile-list">
                  {articleList.map((item, index) => (
                    <SearchItem
                      path={'library'}
                      blurb={item.excerpt}
                      favourite={true}
                      id={item.id}
                      updated_at={item.updated_at}
                      title={item.title}
                      key={`search${index}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </EaseInWrapper>
    </>
  );
};

export default Search;
