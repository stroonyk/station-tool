import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import classnames from 'classnames';

interface SearchFilterProps {
  updateFilters: (resultType: string) => void;
  resultType: string;
  visible: boolean;
  label: string;
}

const SearchFilter: FC<SearchFilterProps> = ({ resultType, visible, updateFilters, label }) => {
  const getFilterContent = (): React.ReactElement | null => {
    if (window.innerWidth >= 680) {
      return (
        <>
          {/* <FontAwesomeIcon icon={['fas', visible ? 'eye' : 'eye-slash']} style={{ marginRight: '0.5rem' }} /> */}
          {label}
        </>
      );
    } else {
      switch (resultType) {
        case 'article':
          return <FontAwesomeIcon icon={['fal', 'book-open']} />;
        case 'sequence':
          return <FontAwesomeIcon icon={['fal', 'books']} />;
        case 'article_template':
          return <FontAwesomeIcon icon={['fal', 'file-download']} />;
        default:
          return null;
      }
    }
  };

  return (
    <div
      className={classnames('search-filters--pill', {
        [resultType]: true,
      })}
      style={{
        background: visible ? '#606060' : '#cecece',
      }}
      onClick={() => updateFilters(resultType)}
    >
      {getFilterContent()}
    </div>
  );
};

export default SearchFilter;
