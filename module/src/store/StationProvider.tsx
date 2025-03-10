import { useReducer, useEffect, useCallback, useState } from 'react';
import StationContext from './station-context';
import stationReducer, { stationInitialState, ACTION_TYPE, ARTICLES_TYPE } from './stationReducer';
import getStation from '../utils/getStation';
import { useStationContext } from '../store/station-context';

type UserActionWithPayload = {
  type: string;
  username: string;
};

type UserActionWithoutPayload = {
  type: string;
};

export type UserAction = UserActionWithPayload | UserActionWithoutPayload;

const StationProvider = ({ children }: any) => {
  const [state, stationDispatch] = useReducer(stationReducer, stationInitialState);

  // const [questionnaireList, setQuestionnaireList] = useState([]);

  const setSelectedArticle = (id: number) => {
    stationDispatch({ type: ACTION_TYPE.SET_SELECTED_ARTICLE, payload: id });
  };

  const setArticles = (articles: [], id: number, articlesType: ARTICLES_TYPE) => {
    stationDispatch({ type: ACTION_TYPE.SET_ARTICLES, payload: { articles, id, articlesType } });
  };

  const setCategories = (categories: []) => {
    stationDispatch({ type: ACTION_TYPE.SET_CATEGORIES, payload: categories });
  };
  const setGuides = (guides: []) => {
    stationDispatch({ type: ACTION_TYPE.SET_GUIDES, payload: guides });
  };
  const setTemplates = (templates: []) => {
    stationDispatch({ type: ACTION_TYPE.SET_TEMPLATES, payload: templates });
  };
  const setSectors = (sectors: []) => {
    stationDispatch({ type: ACTION_TYPE.SET_SECTORS, payload: sectors });
  };
  const setFavourites = (favourites: []) => {
    stationDispatch({ type: ACTION_TYPE.SET_FAVOURITES, payload: favourites });
  };
  const setGoHome = (go: boolean) => {
    stationDispatch({ type: ACTION_TYPE.GO_HOME, payload: go });
  };
  const setSelectedCategory = (category: number) => {
    stationDispatch({ type: ACTION_TYPE.SET_SELECTED_CATEGORY, payload: category });
  };
  const setSelectedGuide = (guide: number) => {
    stationDispatch({ type: ACTION_TYPE.SET_SELECTED_GUIDE, payload: guide });
  };
  const setSelectedSector = (sector: number) => {
    stationDispatch({ type: ACTION_TYPE.SET_SELECTED_SECTOR, payload: sector });
  };
  const setSwipeDirection = (direction: string) => {
    stationDispatch({ type: ACTION_TYPE.SET_SWIPE_DIRECTION, payload: direction });
  };

  const stationCtx = useStationContext();
  const hydrateCategories = async (): Promise<void> => {
    const categories = await getStation().categories().index();
    const categoryList = categories.category.map(
      ({ id, title, brief, description, image_url, parent_id, updated_at }) => ({
        id,
        title,
        brief,
        description,
        image_url,
        parent_id,
        updated_at,
      }),
    );
    setCategories(categoryList);
  };
  const hydrateFavourites = async (): Promise<void> => {

    const favourites = await getStation().me().articles().favourites().index();
    // debugger;
    const favouritesList = favourites.article.map(({ id, title, excerpt, updated_at, metadata }) => ({
      id,
      title,
      excerpt,
      updated_at,
      metadata,
    }));
    setFavourites(favouritesList);
  };
  const hydrateGuides = async (): Promise<void> => {
    const sequences = await getStation().sequences().index();

    const sequencesList = sequences.sequence.map(({ id, title, description }) => ({
      id,
      title,
      description,
    }));
    setGuides(sequencesList);
  };

  const hydrateSectors = async (): Promise<void> => {
    const sectors = await getStation()
      .sectors()
      .index({ parent: null, hide_empty: true, hidden: false, sort: { key: 'title', order: 'ASC' } });

    const sectorList = sectors.sector.map(({ id, title, brief, description }) => ({ id, title, brief, description }));
    setSectors(sectorList);
  };

  useEffect(() => {
    if (!state.savedCategories || state.savedCategories.length === 0) {
      hydrateCategories();
    }
    if (!state.savedGuides || state.savedGuides.length === 0) {
      hydrateGuides();
    }
    if (!state.savedSectors || state.savedSectors.length === 0) {
      hydrateSectors();
    }
    if (!state.savedFavourites || state.savedFavourites.length === 0) {
      hydrateFavourites();
    }
  }, []);
  const stationContext = {
    ...state,
    setSelectedArticle,
    setArticles,
    setCategories,
    setTemplates,
    setGuides,
    setSectors,
    setFavourites,
    setGoHome,
    setSelectedCategory,
    setSelectedGuide,
    setSelectedSector,
    setSwipeDirection,
    hydrateFavourites,
  };

  return <StationContext.Provider value={stationContext}>{children}</StationContext.Provider>;
};

export default StationProvider;
