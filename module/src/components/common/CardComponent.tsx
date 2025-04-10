import React from 'react';
import { Link } from 'react-router-dom';
import FavouriteButton from './FavouriteButton'; // Adjust the import path if necessary
import { downloadTemplate, formatDate, fileTypeIcons } from '../../helpers/helpers'; // Adjust the import path if necessary
import { getDynamicValueById } from '../../helpers/helpers';
import { motion } from 'framer-motion';
import { cardVariants } from '../../utils/animations';
import { useStationContext } from '../../store/station-context';

interface CardComponentProps {
  item: any;
  isTemplate?: boolean;
  favourite?: boolean;
  path?: string;
  templateId?: number;
}

const CardComponent: React.FC<CardComponentProps> = ({ templateId, isTemplate, item, favourite, path }) => {
  const { basePath } = useStationContext();
  const contents = (
    <div className="tile-contents">
      <div className="tile-header">
        {item.image_url && <img src={item.image_url} alt={`Image for ${item.title}`} />}
        <div className={`title ${item.image_url ? 'url' : ''}`}>
          <h3>{item.title}</h3>
        </div>
      </div>

      <div
        className="subtext my-s"
        dangerouslySetInnerHTML={{
          __html: item.brief ?? item.description ?? item.summary ?? item.excerpt ?? '',
        }}
      />

      <div className="subtext fs--s mt-auto">
        {formatDate(new Date(item.updated_at))}
        {item.file_type && (
          <span className="list-icon">
            <i className={`fas ${fileTypeIcons[item.file_type] || 'fa-file'}`}></i>
          </span>
        )}
        {favourite && (
          <div className="button-group article-actions">
            <FavouriteButton id={item.id} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {isTemplate ? (
        <a
          key={item.id}
          className="tile tile--350 tile--link-title-underline tile--white article flex-column"
          onClick={() => downloadTemplate(templateId)}
        >
          {contents}
        </a>
      ) : (
        <Link
          to={`${basePath}/${path}/${item.id}`}
          key={item.id}
          className="tile tile--350 tile--link-title-underline tile--white article flex-column"
        >
          {contents}
        </Link>
      )}
    </>
  );
};

export default CardComponent;
