import { ACTION_TYPE } from '../store/stationReducer';

// hooks/useHydrators.ts
export const useHydrators = (state, dispatch, config) => {
  const hydrateCategories = async () => {
    const categories = await config.station.categories().index();
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
    dispatch({ type: ACTION_TYPE.SET_CATEGORIES, payload: categoryList });
  };

  const hydrateFavourites = async () => {
    const favourites = await config.station.me().articles().favourites().index();
    const favouritesList = favourites.article.map(({ id, title, excerpt, updated_at, metadata }) => ({
      id,
      title,
      excerpt,
      updated_at,
      metadata,
    }));
    dispatch({ type: ACTION_TYPE.SET_FAVOURITES, payload: favouritesList });
  };

  const hydrateGuides = async () => {
    const sequences = await config.station.sequences().index();
    const sequencesList = sequences.sequence.map(({ id, title, description, updated_at }) => ({
      id,
      title,
      description,
      updated_at,
    }));
    dispatch({ type: ACTION_TYPE.SET_GUIDES, payload: sequencesList });
  };

  const hydrateSectors = async () => {
    const sectors = await config.station
      .sectors()
      .index({ parent: null, hide_empty: true, hidden: false, sort: { key: 'title', order: 'ASC' } });
    const sectorList = sectors.sector.map(({ id, title, brief, description, updated_at }) => ({
      id,
      title,
      brief,
      description,
      updated_at,
    }));
    dispatch({ type: ACTION_TYPE.SET_SECTORS, payload: sectorList });
  };

  const hydrators = [
    { data: state.savedCategories, hydrate: hydrateCategories },
    { data: state.savedGuides, hydrate: hydrateGuides },
    { data: state.savedSectors, hydrate: hydrateSectors },
    { data: state.savedFavourites, hydrate: hydrateFavourites },
  ];

  return { hydrators, hydrateFavourites };
};
