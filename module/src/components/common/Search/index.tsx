import { FC, useCallback, useEffect, useRef, useState } from 'react';
import useStateCallback from './useStateCallback';
// import { searchClassnames } from './Search.classnames';
// import styles from './Search.module.scss';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { ResultsList } from './ResultsList';
import { NestedResultsList } from './ResultsListNested';

export interface IResultsListFull {
  title: string;
  path: string;
  results: IResultsList[];
}
export interface IResultsList {
  id: string;
  title: string;
  path: string;
  visited?: string;
  reviewed_at?: string;
}

export interface ISearchProps {
  searchFunction: (value: string) => Promise<IResultsList[] | IResultsListFull[]>;
  searchUrl: string;
  theme?: 'light' | 'dark';
  placeholderText?: string;
  value?: string;
  id?: string;
}

const isResultsListFull = (results: IResultsList[] | IResultsListFull[] | undefined): results is IResultsListFull[] => {
  return Array.isArray(results) && results.length > 0 && 'results' in results[0];
};

const Search: FC<ISearchProps> = ({
  searchFunction,
  searchUrl,
  placeholderText = 'Search',
  theme = 'dark',
  value = '',
  id,
}) => {
  const [results, setResults] = useStateCallback<IResultsList[] | IResultsListFull[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [url, setUrl] = useState('');
  const [highlightLine, setHighlightLine] = useState(-1);
  const [mouseOverLine, setMouseOverLine] = useState(-1);
  const [highlightElement, setHighlightElement] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      resetSearch();
    }
  }, []);

  useEffect(() => {
    if ((results ?? []).length > 0) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [results, handleOutsideClick]);

  useEffect(() => {
    if (highlightLine > -1 || mouseOverLine > -1) return;

    if (searchTerm && searchTerm !== value) {
      setSearching(true);
      performSearch();
    } else {
      resetSearch();
    }
  }, [searchTerm]);

  useEffect(() => {
    if (value) return;
    const element = document.querySelector(`li.selected`);
    // const element = document.querySelector(`li.${styles.selected}`);
    if (element && mouseOverLine === -1) {
      setSearchTerm(element.getAttribute('data-title') || '');
      setUrl(element.getAttribute('data-path') || '');
    } else {
      setSearchTerm('');
      setUrl('');
    }
  }, [highlightLine]);

  const resetSearch = () => {
    setResults([]);
    setSearching(false);
    setHighlightLine(-1);
  };

  const performSearch = async () => {
    const searchResult = await searchFunction(searchTerm);
    setResults(searchResult, () => setSearching(false));
  };

  const handleChange = (term: string) => {
    setSearchTerm(term);
    setUrl(`${searchUrl}${term}`);
  };

  const handleResultsClick = (path?: string) => {
    // debugger;
    if (path) {
      navigate(path);
    }
    // if (path) window.location.href = path;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results) return;
    handleMouseOut();
    const len = getResultsLength();
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      const delta = e.key === 'ArrowUp' ? -1 : 1;
      if (mouseOverLine !== -1) {
        const newMouseHighlight =
          e.key === 'ArrowUp'
            ? mouseOverLine > 0
              ? mouseOverLine - 1
              : len - 1
            : mouseOverLine < len - 1
            ? mouseOverLine + 1
            : 0;
        setHighlightLine(newMouseHighlight);
      } else {
        const newHighlight = (highlightLine + delta + len) % len;

        results.length === 0 ? performSearch() : setHighlightLine(newHighlight);
      }
      e.preventDefault();
    } else if (e.key === 'Escape') {
      resetSearch();
    } else if (e.key === 'Enter') {
      handleResultsClick(url);
    } else {
      setHighlightLine(-1);
    }
  };

  const handleMouseOver = (element: HTMLElement) => {
    highlightElement?.classList.remove('selected');
    element.classList.add('selected');
    // highlightElement?.classList.remove(styles.selected);
    // element.classList.add(styles.selected);
    setMouseOverLine(Number(element.dataset.id));
    setHighlightElement(element);
    setHighlightLine(-1);
  };

  const handleMouseOut = () => {
    // highlightElement?.classList.remove(styles.selected);
    highlightElement?.classList.remove('selected');
    setMouseOverLine(-1);
  };
  const onMouseDownHandler = async (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.button === 0) {
      performSearch();
    }
  };
  const getResultsLength = () =>
    (results ?? []).reduce((acc, item) => acc + ('results' in item ? item.results.length : 1), 0);

  // const inputClasses = classNames(searchClassnames(theme), {
  //   [styles.open]: results && results.length > 0,
  // });

  // const inputClasses = classNames(searchClassnames(theme), {
  //   [styles.open]: results && results.length > 0,
  // });

  return (
    // <div className={inputClasses} id={id} ref={containerRef} data-testid="search-component">
    <div className={'search--light flex-row'} id={id} ref={containerRef} data-testid="search-component">
      {searching ? (
        <i className="fa-regular fa-spinner fa-spin"></i>
      ) : (
        <i onClick={() => handleResultsClick(url)} className="fa-solid fa-magnifying-glass" />
      )}
      <input
        className="search-input"
        type="text"
        value={searchTerm}
        placeholder={placeholderText}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onMouseDown={onMouseDownHandler}
      />
      {/* <div className={styles['seach-options']}> */}
      <div className={'seach-options'}>
        {(results ?? []).length > 0 &&
          (isResultsListFull(results) ? (
            <NestedResultsList
              results={results}
              highlightLine={highlightLine}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              onResultClick={handleResultsClick}
            />
          ) : (
            <ResultsList
              results={results}
              highlightLine={highlightLine}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              onResultClick={handleResultsClick}
            />
          ))}
      </div>
    </div>
  );
};

export default Search;
