import { IEditorConfig } from '../types';
import Station from '@rradar/station-sdk';

export enum ACTION_TYPE {
  INITIALISE = 'INITIALISE',
  SET_SELECTED_ARTICLE = 'SET_SELECTED_ARTICLE',
  SET_ARTICLES = 'SET_ARTICLES',
  SET_CATEGORIES = 'SET_CATEGORIES',
  SET_GUIDES = 'SET_GUIDES',
  SET_SECTORS = 'SET_SECTORS',
  SET_TEMPLATES = 'SET_TEMPLATES',
  SET_FAVOURITES = 'SET_FAVOURITES',
  GO_HOME = 'GO_HOME',
  SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY',
  SET_SELECTED_GUIDE = 'SET_SELECTED_GUIDE',
  SET_SELECTED_SECTOR = 'SET_SELECTED_SECTOR',
  SET_SWIPE_DIRECTION = 'SET_SWIPE_DIRECTION',
  SET_LOADING = 'SET_LOADING',
}
export enum ARTICLES_TYPE {
  CATEGORY = 'CATEGORY',
}

export const stationInitialState = {
  config: null as IEditorConfig | null,
  basePath: null as string | null,
  stationSDK: null as Station | null,
  selectedArticle: 0,
  savedArticles: {} as IArticlesType,
  savedCategories: [] as any[],
  savedGuides: [] as any[],
  savedSectors: [] as any[],
  savedFavourites: [] as any[],
  savedTemplates: [] as any[],
  goHome: false,
  selectedCategory: 0,
  selectedGuide: 0,
  selectedSector: 0,
  swipeDirection: 'left' as 'left' | 'right',
  loading: false,
};
export type UserState = {
  config: IEditorConfig | null;
  basePath: string;
  stationSDK: Station;
  selectedArticle: number;
  savedArticles: IArticlesType;
  savedCategories: any[];
  savedGuides: any[];
  savedSectors: any[];
  savedFavourites: any[];
  goHome: boolean;
  selectedCategory: number;
  selectedGuide: number;
  selectedSector: number;
  savedTemplates: any[];
  swipeDirection: 'left' | 'right';
  setLoading: boolean;
};
export interface IArticlesType {
  articles: [];
  id: number;
  summary:string;
  title:string;
  reviewed_at:string;
  articleType: ARTICLES_TYPE;
}
export type UserAction =
  | { type: ACTION_TYPE.INITIALISE }
  | { type: ACTION_TYPE.SET_SELECTED_ARTICLE; payload: number }
  | { type: ACTION_TYPE.SET_SELECTED_CATEGORY; payload: number }
  | { type: ACTION_TYPE.SET_SELECTED_GUIDE; payload: number }
  | { type: ACTION_TYPE.SET_SELECTED_SECTOR; payload: number }
  | { type: ACTION_TYPE.SET_CATEGORIES; payload: [] }
  | { type: ACTION_TYPE.SET_TEMPLATES; payload: [] }
  | { type: ACTION_TYPE.SET_GUIDES; payload: [] }
  | { type: ACTION_TYPE.SET_SECTORS; payload: [] }
  | { type: ACTION_TYPE.SET_FAVOURITES; payload: [] }
  | { type: ACTION_TYPE.SET_SWIPE_DIRECTION; payload: 'left' | 'right' }
  | { type: ACTION_TYPE.GO_HOME; payload: boolean }
  | { type: ACTION_TYPE.SET_ARTICLES; payload: IArticlesType }
  | { type: ACTION_TYPE.SET_LOADING; payload: boolean };

const stationReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case ACTION_TYPE.INITIALISE: {
      const basePath = state.config.hybrid_monoserver ? '/station' : '';
      return {
        ...state,
        basePath,
        stationSDK: state.config.station,
      };
    }
    case ACTION_TYPE.SET_SELECTED_ARTICLE: {
      const selectedArticle = action.payload;
      return {
        ...state,
        selectedArticle,
      };
    }
    case ACTION_TYPE.SET_SELECTED_CATEGORY: {
      const selectedCategory = action.payload;
      return {
        ...state,
        selectedCategory,
      };
    }
    case ACTION_TYPE.SET_SELECTED_GUIDE: {
      const selectedGuide = action.payload;
      return {
        ...state,
        selectedGuide,
      };
    }
    case ACTION_TYPE.SET_SELECTED_SECTOR: {
      const selectedSector = action.payload;
      return {
        ...state,
        selectedSector,
      };
    }
    case ACTION_TYPE.SET_CATEGORIES: {
      const savedCategories = action.payload;
      return {
        ...state,
        savedCategories,
      };
    }
    case ACTION_TYPE.SET_GUIDES: {
      const savedGuides = action.payload;
      return {
        ...state,
        savedGuides,
      };
    }
    case ACTION_TYPE.SET_TEMPLATES: {
      const savedTemplates = action.payload;
      return {
        ...state,
        savedTemplates,
      };
    }
    case ACTION_TYPE.SET_FAVOURITES: {
      const savedFavourites = action.payload;
      return {
        ...state,
        savedFavourites,
      };
    }
    case ACTION_TYPE.SET_SWIPE_DIRECTION: {
      const swipeDirection = action.payload;
      return {
        ...state,
        swipeDirection,
      };
    }
    case ACTION_TYPE.GO_HOME: {
      const goHome = action.payload;
      return {
        ...state,
        goHome,
      };
    }
    case ACTION_TYPE.SET_SECTORS: {
      const savedSectors = action.payload;

      return {
        ...state,
        savedSectors,
      };
    }
    case ACTION_TYPE.SET_LOADING: {
      const loading = action.payload;

      return {
        ...state,
        loading,
      };
    }
    case ACTION_TYPE.SET_ARTICLES: {
      const articles = action.payload.articles;
      const id = action.payload.id;
      const articleType = action.payload.articleType;
      return {
        ...state,
        savedArticles: { articles, id, articleType },
       loading: false,
      };
    }
    default:
      throw new Error('menu reducer: unknown action type');
  }
};

export default stationReducer;
