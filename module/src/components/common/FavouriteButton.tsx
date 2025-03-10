import { useStationContext } from '../../store/station-context';
import { isFavourite } from '../../helpers/helpers';
import getStation from '../../utils/getStation';

export interface IFavouriteProps {
  id: number;
}

// dummy object so we are super responsive when adding or deleteing
let dummyFavourite = {
  id: 1,
  title: 'Article 1',
  excerpt: 'This is article 1',
  updated_at: '2022-01-01 12:00:00',
  metadata: {},
};

const FavouriteButton: React.FC<IFavouriteProps> = ({ id }) => {
  const stationCtx = useStationContext();

  const favouriteClickedHandler = async (articleId: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dummyFavourite.id = articleId;

    if (isFavourite(stationCtx.savedFavourites, articleId)) {
      // leave this!!! it's so we're super responsive on a slow network. obvs error checking needed
      stationCtx.setFavourites(stationCtx.savedFavourites.filter((item) => item.id !== articleId));
      const mess = await getStation().articles().favourite().delete(articleId);
    } else {
      // leave this!!! it's so we're super responsive on a slow network. obvs error checking needed
      stationCtx.setFavourites([...stationCtx.savedFavourites, dummyFavourite]);
      const mess = await getStation().articles().favourite().post(articleId);
    }

    // now hydrate based on the real api results
    stationCtx.hydrateFavourites();
  };

  return (
    <>
      <button
        title="Favourite"
        className={`icon-button ${isFavourite(stationCtx.savedFavourites, id) ? 'favourited' : ''}`}
        onClick={(event) => favouriteClickedHandler(id, event)}
      >
        <span className="list-icon">
          <i className="fa fa-star"></i>
        </span>
      </button>
    </>
  );
};

export default FavouriteButton;
