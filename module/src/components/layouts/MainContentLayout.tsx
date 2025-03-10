// import { ErrorBoundary, ErrorPage } from '@rradar/core';
import { FC, useEffect } from 'react';
import Filters from '../common/Filters';
import { Outlet } from 'react-router-dom';
import TestSearch from '../common/TestSearch';
import Search from '../common/Search';
import { getSearchSuggestions, getSearchFunction } from '../../utils/searchService';
import { AnimatePresence, motion } from 'framer-motion';

// import Breadcrumbs from '../common/Breadcrumbs';

export const FILTERS = {
  ARTICLE: 'article',
  SEQUENCE: 'sequence',
  TEMPLATE: 'article_template',
};

interface IMainContentLayout {
  /**
   * React Children
   */
  children: React.ReactNode;
  /**
   * If set, will set the main background colour
   */
  background: 'white' | 'pearl';
}

// Component uses some of the atomic css classes that exist in core (pt-l and bg-pearl)
// TODO: Fallback needs improving
// TODO: Add Loader
const searchFunction = async (searchTerm: string): Promise<{ id: string; title: string; path: string }[]> => {
  return getSearchSuggestions(searchTerm);
};
// const searchFunction = async (searchTerm: string): Promise<{ id: string; title: string; path: string }[]> => {
//   const suggestions = await getSearchFunction(searchTerm, { article: true });
//   console.log('suggestions are ' + suggestions);
//   const formattedSuggestions = suggestions.map((suggestion) => ({
//     id: suggestion.id,
//     title: suggestion.title,
//     path: `Station/search?term=${encodeURIComponent(suggestion.title)}&filters=${FILTERS.ARTICLE},${FILTERS.SEQUENCE},${
//       FILTERS.TEMPLATE
//     }`,
//   }));

//   return formattedSuggestions;
// };

const MainContentLayout: FC<IMainContentLayout> = ({ children, background = 'white' }) => {
  return (
    <div className="main-content-layout">
      <Search searchUrl="/station/search?term=" searchFunction={searchFunction} />
      <Filters />

      <Outlet />
    </div>
  );
};

export default MainContentLayout;
