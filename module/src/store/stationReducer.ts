export enum ACTION_TYPE {
  INITIALISE = 'INITIALISE_SHIPS',
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
}
export enum ARTICLES_TYPE {
  CATEGORY = 'CATEGORY',
}

export const stationInitialState = {
  selectedArticle: 0,
  savedArticles: {},
  savedCategories: [],
  savedGuides: [],
  savedSectors: [],
  savedFavourites: [],
  goHome: false,
  selectedCategory: 0,
  selectedGuide: 0,
  selectedSector: 0,
  savedTemplates: [],
  swipeDirection: 'left',
};
type UserState = {
  selectedArticle: number;
  savedArticles: IArticlesType;
  savedCategories: [];
  savedGuides: [];
  savedSectors: [];
  savedFavourites: [];
  goHome: boolean;
  selectedCategory: number;
  selectedGuide: number;
  selectedSector: number;
  savedTemplates: [];
  swipeDirection: 'left' | 'right';
};
export interface IArticlesType {
  articles: [];
  id: number;
  articleType: ARTICLES_TYPE;
}
type UserAction =
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
  | { type: ACTION_TYPE.SET_SWIPE_DIRECTION; payload: string }
  | { type: ACTION_TYPE.GO_HOME; payload: boolean }
  | { type: ACTION_TYPE.SET_ARTICLES; payload: IArticlesType };

const stationReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case ACTION_TYPE.INITIALISE: {
      return {
        ...state,
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
    case ACTION_TYPE.SET_ARTICLES: {
      const articles = action.payload.articles;
      const id = action.payload.id;
      const articleType = action.payload.articleType;
      return {
        ...state,
        savedArticles: { articles, id, articleType },
      };
    }
    default:
      throw new Error('menu reducer: unknown action type');
  }
};

export default stationReducer;
