// import { Request } from 'express';
import getStation from './getStation';
import { ISearchResponse, SearchType } from '@rradar/station-sdk';
// import cookies from 'js-cookie';
const Cookies = require('js-cookie');

const cookieName = 'previousSearches';

export const getSearchSugggestions = (newSearchTerm: string): [] => {
  if (newSearchTerm) {
    const savedSearches = Cookies.get(cookieName);
    if (savedSearches) {
      const previousSearches = JSON.parse(savedSearches);
      const filteredSuggestions = previousSearches.filter((term: string) =>
        term.toLowerCase().includes(newSearchTerm.toLowerCase()),
      );
      return filteredSuggestions;
    }
  } else {
    return [];
  }
};

export const saveSearch = (searchTerm: string) => {
  if (!searchTerm) return;

  const savedSearches = Cookies.get(cookieName);
  const previousSearches = savedSearches ? JSON.parse(savedSearches) : [];

  // Avoid duplicates
  if (!previousSearches.includes(searchTerm)) {
    previousSearches.push(searchTerm);
    Cookies.set(cookieName, JSON.stringify(previousSearches));
  }
};

export const getSearchFunction = async (
  searchTerm: string,
  filters?: { article?: boolean; sequence?: boolean; article_template?: boolean },
): Promise<{ id: string; title: string; path: string }[]> => {
  // Determine types to include based on filters
  const types: SearchType[] = [];
  if (filters?.article) types.push('article');
  if (filters?.sequence) types.push('sequence');
  if (filters?.article_template) types.push('article_template');

  const searchParams = {
    // article_type: 'article',
    boost_country: 1,
    included_fields: ['id', 'title'],
    no_track: true,
    size: 1000,
    term: searchTerm,
    type_filters: { article: { state: 'published' } },
    types, // Use the dynamically created types array
  };

  let response: ISearchResponse;

  try {
    response = await getStation().search().post(searchParams);

    // Transform the response into the required format
    const formattedResults = response.rows.map((item: any) => ({
      id: item.id,
      title: item.source.title,
      path: item.path || `/articles/${item.id}`, // Default path if 'path' is unavailable
    }));

    return formattedResults;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};
