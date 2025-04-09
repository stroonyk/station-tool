import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../helpers/helpers';
import FavouriteButton from '../../common/FavouriteButton';
import { useStationContext } from '../../../store/station-context';

interface ISearchItemProps {
  path: string;
  id: number;
  title: string;
  blurb?: string;
  updated_at: string;
  favourite?: boolean; // New prop
}

const SearchItem: React.FC<ISearchItemProps> = ({ path, id, title, blurb, updated_at, favourite = false }) => {
  const { basePath } = useStationContext();
  return (
    <Link
      to={`${basePath}/${path}/${id}`}
      key={`template-${id}`}
      className="tile tile--350 tile--link-title-underline tile--white article flex-column"
    >
      <div className="tile-contents">
        <h3>{title}</h3>

        <div
          className="subtext my-s"
          dangerouslySetInnerHTML={{
            __html: blurb,
          }}
        />
        <div className="subtext fs--s mt-auto">
          {formatDate(new Date(updated_at))}
          {favourite && (
            <div className="button-group article-actions">
              <FavouriteButton id={id} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
