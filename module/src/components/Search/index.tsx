import * as React from 'react';
import classnames from 'classnames';
// import { isAdminPage } from '../../../../helpers';
// import { useDebounce } from '../../../../hooks/useDebounce';
import getStation from '../../utils/getStation';
import SearchItem from './components/SearchItem';
import SearchFilter from './components/SearchFilter';
import SearchInput from './components/SearchInput';
// import ClickOutside from '../../../../hooks/ClickOutside';
import { isEmpty } from 'lodash';
import { SearchHistoryItem } from './components/SearchHistoryItem';
// import { injectedSearchBody } from '../../../constants/injectedSearchSettings';
import { Button } from '@rradar/core';

export interface IFilterType {
  label: string;
  type: 'article' | 'sequence' | 'article_template';
  visible: boolean;
}

const resultTypeShape: IFilterType[] = [
  {
    label: 'Articles',
    type: 'article',
    visible: true,
  },
  {
    label: 'Guides',
    type: 'sequence',
    visible: true,
  },
  {
    label: 'Templates',
    type: 'article_template',
    visible: true,
  },
];

export interface ISearchProps {
  searchTerm?: string;
  isOpen?: boolean;
  allowedFilters?: IFilterType['type'][];
  callbacks?: {
    onClick?: (data: any) => void;
    afterSearch?: () => void;
  };
}

const Search: React.FunctionComponent<ISearchProps> = (props: ISearchProps) => {
  const buildAutoComplete = () => {
    return ['article', 'sequence', 'article_template'];
  };
  const buildResultTypeShape = (resultTypeShape: IFilterType[]) => {
    if (props.allowedFilters) {
      return resultTypeShape.filter((shape) => {
        if (props.allowedFilters.includes(shape.type)) {
          return shape;
        }
      });
    }
    return resultTypeShape;
  };

  const [searchQuery, setSearchQuery] = React.useState(props.searchTerm ? props.searchTerm.trimStart() : '');
  const [results, setResults] = React.useState([]);
  const [actorSearchHistory, setActorSearchHistory] = React.useState([]);
  const [resultTypes, setResultTypes] = React.useState<IFilterType[]>(buildResultTypeShape(resultTypeShape));
  const [isOpen, setIsOpen] = React.useState(false || props.isOpen);
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchError, setSearchError] = React.useState(null);
  const inputEl = React.useRef<HTMLInputElement>(null);
  const dropdown = React.useRef<HTMLDivElement>(null);

  const autocomplete = {
    types: !true
      ? buildAutoComplete()
      : ['article', 'category', 'sector', 'tag', 'country', 'sequence', 'article_template'],
    size: 25,
  };
  // const autocomplete = {
  //   types: !isAdminPage()
  //     ? buildAutoComplete()
  //     : ['article', 'category', 'sector', 'tag', 'country', 'sequence', 'article_template'],
  //   size: 25,
  // };

  const performSearch = async (query, providedTypes?: string[]) => {
    try {
      const response = await getStation().search(
        {
          term: query.trim(),
          ...injectedSearchBody(providedTypes || autocomplete.types),
          types: providedTypes || autocomplete.types,
          no_track: true,
        },
        {},
      );
      return { results: response.rows };
    } catch (error) {
      setIsSearching(false);
      setSearchError(error);
      throw new Error(error);
    }
  };

  // const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const searchHistory = async () => {
    try {
      return await getStation().me().searches({ page: 1, size: 50 });
    } catch (error) {
      console.log('Error', error);
    }
  };
  React.useEffect(() => {
    searchHistory().then((result) => {
      const cleanedResults = result.search?.filter((item, index, array) => {
        return item.term !== array[index - 1]?.term;
      });
      setActorSearchHistory(cleanedResults);
    });
  }, []);
  React.useEffect(
    () => {
      if (props.searchTerm && props.isOpen) {
        setSearchQuery(props.searchTerm);
        setIsOpen(true);
      }

      // if (debouncedSearchTerm && debouncedSearchTerm.length) {
      if (false) {
        const passedFilters = resultTypes.filter((type) => type.visible === true).map((filtered) => filtered.type);

        setIsSearching(true);
        performSearch('bob', passedFilters).then(({ results }) => {
          setSearchError(null);
          setIsSearching(false);
          setResults(results);
          props.callbacks?.afterSearch && props.callbacks.afterSearch();
          dropdown.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        });
      } else {
        setResults([]);
      }
    },
    [props.isOpen, props.searchTerm, resultTypes], // Only call effect if debounced search term changes
  );

  const updateFilters = (filterValue: string) => {
    const filters = [...resultTypes];
    const updatedFilters: IFilterType[] = filters.map((filter) => {
      if (filter.type === filterValue) {
        filter.visible = !filter.visible;
      }
      return filter;
    });
    if (updatedFilters.filter((filter) => filter.visible).length === 0) {
      return;
    }
    setResultTypes(updatedFilters);
  };

  const generateSearchSubmitURL = () => {
    const filters = resultTypes
      .filter((type) => {
        if (type.visible) {
          return type;
        }
      })
      .map((type) => type.type);

    let url = `/search/?q=${encodeURIComponent(searchQuery)}`;
    const stub = window.location.pathname.split('/').filter((i) => i)[0];
    if (stub && stub === 'admin') url = `/${stub}${url}`;
    if (filters.length > 0) url = `${url}&filters=${filters}`;
    return url;
  };

  const getResultsByFilters = (results, filters) => {
    const activeFilters = filters
      .filter((filter) => {
        if (filter.visible) {
          return filter.type;
        }
      })
      .map((res) => res.type);

    const filteredResults = results?.filter((result) => {
      if (activeFilters.includes(result.source.search_type)) {
        return result;
      }
    });
    return filteredResults;
  };

  return (
    <form
      method="GET"
      action="/search/"
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();

        const url = generateSearchSubmitURL();
        if (searchQuery !== '') {
          window.location.href = url;
        } else {
          inputEl.current.focus();
        }
      }}
    >
      {/* <ClickOutside handleOutside={() => setIsOpen(false)} exception={'.react-joyride__tooltip'}> */}
      <div className="search-inner">
        <SearchInput
          isSearching={isSearching}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          inputEl={inputEl}
          onClick={setIsOpen}
        />
        <div
          ref={dropdown}
          className={classnames('search-results', {
            'is-visible': isOpen,
          })}
        >
          <div className="search-filters">
            Filters:
            {resultTypes.map((resultType) => {
              return (
                <SearchFilter
                  key={resultType.type}
                  label={resultType.label}
                  resultType={resultType.type}
                  visible={resultType.visible}
                  updateFilters={updateFilters}
                />
              );
            })}
          </div>
          <div className="search-results--items">
            {searchError && (
              <div className="search-results--error">
                We&apos;re sorry about that It looks like something went wrong at our end. Please try searching again or{' '}
                <a href="/browse">browsing via our categories.</a> Our engineers have been notified and should be
                looking into the cause.
              </div>
            )}

            {isEmpty(results) && isEmpty(actorSearchHistory) && (
              <div className="search-results--empty">No results yet... try searching.</div>
            )}
            {!isEmpty(actorSearchHistory) && isEmpty(results) && !searchError && (
              <>
                <div className="search-results--empty">Your Previous Searches</div>
                {actorSearchHistory.map((item) => {
                  return (
                    <SearchHistoryItem
                      term={item.term}
                      key={item.term + item.timestamp}
                      callback={() => {
                        setSearchQuery(item.term);
                      }}
                    />
                  );
                })}
              </>
            )}
            {getResultsByFilters(results, resultTypes).map((result, index) => {
              if (result.source.search_type === 'sequence' && result.source.published_at !== null) {
                return (
                  <SearchItem
                    onClick={props.callbacks?.onClick}
                    key={`${result.source.search_type} - ${result.id}`}
                    item={result.source}
                    index={index}
                  />
                );
              } else if (result.source.search_type !== 'sequence') {
                return (
                  <SearchItem
                    key={`${result.source.search_type} - ${result.id}`}
                    onClick={props.callbacks?.onClick}
                    item={result.source}
                    index={index}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
      {/* </ClickOutside> */}
    </form>
  );
};

export default Search;
