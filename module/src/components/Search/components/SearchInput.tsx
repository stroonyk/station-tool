import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

interface SearchInputProps {
  searchQuery: string;
  inputEl: React.Ref<HTMLInputElement>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isSearching: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchInput: FC<SearchInputProps> = ({ searchQuery, inputEl, setSearchQuery, isSearching, onClick }) => {
  return (
    <>
      <label className="search-label">Search Now</label>
      <input
        ref={inputEl}
        className="search-field form-control"
        id="search-field"
        name="q"
        onClick={() => onClick(true)}
        type="search"
        placeholder="USE THE OTHER SEARCH BAR!"
        role="search"
        value={searchQuery}
        disabled
        onChange={(e) => setSearchQuery(e.target.value.trimStart())}
      />

      <button type="submit" className="search-button">
        {/* <FontAwesomeIcon icon={['fas', 'search']} /> */}
        <i className="fa fa-search"></i>
      </button>

      {isSearching && <div className="is-searching"></div>}
    </>
  );
};

export default SearchInput;
