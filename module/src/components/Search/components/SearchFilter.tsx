import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import classnames from 'classnames';
// import { SizeMe } from 'react-sizeme';

export interface ISearchFilterProps {
  updateFilters: (resultType: string) => void;
  resultType: string;
  visible: boolean;
  label: string;
}

export function SearchFilter({ resultType, visible, updateFilters, label }: ISearchFilterProps): React.ReactElement {
  const getFilterContent = (): React.ReactElement => {
    if (window.innerWidth >= 680) {
      return (
        <>
          <FontAwesomeIcon icon={['fas', visible ? 'eye' : 'eye-slash']} style={{ marginRight: '0.5rem' }} />
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
      }
    }
  };

  return (
    // <SizeMe>
    <>
      {() => {
        return (
          <div
            className={classnames('search-filters--pill', {
              [resultType]: true,
            })}
            style={{
              background: visible ? '#606060' : '#cecece',
            }}
            onClick={() => {
              updateFilters(resultType);
            }}
          >
            {getFilterContent()}
          </div>
        );
      }}
    </>
    // </SizeMe>
  );
}
