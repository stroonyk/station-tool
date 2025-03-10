// import { Request } from 'express';
import getStation from './getStation';
import { ISearchResponse } from '@rradar/station-sdk';
// import { getState } from './getState';
import { FILTERS } from './constants';
// import { IResultsList, IResultsListFull } from '@rradar/core/Search';
const getState = (): IPublicState => window.__PUBLIC_STATE__ || ({} as IPublicState);

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

export const searchFunction = async (
  searchTerm: string,
  req?: Request,
  filters?: { article?: boolean; sequence?: boolean; article_template?: boolean },
): Promise<{ id: string; title: string; path: string }[]> => {
  // Determine types to include based on filters
  const types = [];
  if (filters?.article) types.push('article');
  if (filters?.sequence) types.push('sequence');
  if (filters?.article_template) types.push('article_template');

  const searchParams = {
    article_type: 'article',
    boost_country: 1,
    included_fields: ['id', 'title'],
    no_track: false,
    size: 1000,
    term: searchTerm,
    type_filters: { article: { state: 'published' } },
    types, // Use the dynamically created types array
  };

  let response: ISearchResponse;

  try {
    // response = await getStation(req).search().post(searchParams);
    response = await getStation().search().post(searchParams);

    // Transform the response into the required format
    const formattedResults = response.rows.map((item: any) => ({
      id: item.id,
      title: item.source.title,
      path: item.path || `/library/articles/${item.id}`, // Default path if 'path' is unavailable
    }));

    return formattedResults;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};

export const getSearchSuggestions = async (searchTerm: string): Promise<IResultsList[] | IResultsListFull[]> => {
  let suggestions: IResultsList[] | IResultsListFull[];
  suggestions = await getLastSearches();
  if (searchTerm) {
    suggestions = getFilteredSuggestions(suggestions, searchTerm);
  }
  return suggestions;
};

export const getFilteredSuggestions = (lastSearches: IResultsList[], searchTerm: string): IResultsListFull[] => {
  const filteredLastSearches = lastSearches.filter((item: IResultsList) => {
    return item.title.startsWith(searchTerm);
  });
  let filtered: IResultsListFull[] = [];
  const suggested = getSuggested(searchTerm);
  const recommended = getRecommended(searchTerm);

  if (filteredLastSearches.length > 0) {
    filtered.push({
      title: 'searches',
      path: '',
      results: filteredLastSearches,
    });
  }

  if (suggested.length > 0) {
    filtered.push({
      title: 'Suggested articles',
      path: '',
      results: suggested,
    });
  }
  if (recommended.length > 0) {
    filtered.push({
      title: 'Recommended articles',
      path: '',
      results: recommended,
    });
  }

  return filtered;
};

export const getFilteredList = (searchTerm: string, list: IResultsList[]): IResultsList[] => {
  let filteredList: IResultsList[];
  if (list) {
    filteredList = list
      .filter((item: { title: any }) => {
        return item.title.toLowerCase().startsWith(searchTerm.toLowerCase());
      })
      .map((suggestion: IResultsList) => ({
        id: suggestion.id,
        title: suggestion.title,
        path: `${window.location.origin}/articles/${suggestion.id}`,
        visited: `${formatDate(suggestion.reviewed_at)}`,
      }));
  }
  return filteredList;
};

export const getRecommended = async (searchTerm: string): Promise<IResultsList[]> => {
  let filteredList: IResultsList[];
  const list = await getStation().articles().index({ only_highlighted: true });
  if (list.article.length > 0) {
    filteredList = getFilteredList(searchTerm, list.article);
  }
  return filteredList;
};
export const getSuggested = async (searchTerm: string): Promise<IResultsList[]> => {
  let filteredList: IResultsList[];
  const list = await getStation().me().suggestedArticles().index();
  if (list.article.length > 0) {
    filteredList = getFilteredList(searchTerm, list.article);
  }
  return filteredList;
};

export const getLastSearches = async (): Promise<IResultsList[]> => {
  const uniqueSearches: string[] = []; // Explicitly typed as a string array
  let formattedSuggestions: IResultsList[] = [];
  // const state = getState();
  const previousSearches = await getStation().me().searches().index();

  if (previousSearches.search.length > 0) {
    previousSearches.search.forEach((item: { term: string }) => {
      if (!uniqueSearches.includes(item.term)) {
        uniqueSearches.push(item.term);
      }
    });

    formattedSuggestions = uniqueSearches.map((suggestion: string) => ({
      id: suggestion,
      title: suggestion,
      path: `station/search?term=${encodeURIComponent(suggestion)}&filters=${FILTERS.ARTICLE},${FILTERS.SEQUENCE},${
        FILTERS.TEMPLATE
      }`,
    }));
  }
  // debugger;
  return formattedSuggestions;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)}`;
};
