import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
// import { isHomePage } from '../utils/helpers';

export interface ISearchInputProps {
  searchQuery: string;
  inputEl: React.Ref<HTMLInputElement>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isSearching: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchInput({
  searchQuery,
  inputEl,
  setSearchQuery,
  isSearching,
  onClick,
}: ISearchInputProps): React.ReactElement {
  return (
    <>
      <label className="search-label">Search Now</label>
      <input
        ref={inputEl}
        className="search-field form-control"
        id={'search-field'}
        name={'q'}
        onClick={() => onClick(true)}
        type={'search'}
        placeholder={'Search for articles, templates & guides'}
        role={'search'}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value.trimStart());
        }}
      />

      {true && (
        <button type={'submit'} className="search-button">
          <FontAwesomeIcon icon={['fas', 'search']} />
        </button>
      )}
      {isSearching && <div className="is-searching"></div>}
    </>
  );
}
