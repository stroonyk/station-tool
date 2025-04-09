import React from 'react';
import { Link } from 'react-router-dom';
import FavouriteButton from './FavouriteButton'; // Adjust the import path if necessary
import { formatDate } from '../../helpers/helpers'; // Adjust the import path if necessary
import { getDynamicValueById } from '../../helpers/helpers';
import { motion } from 'framer-motion';
import { cardVariants } from '../../utils/animations';

interface CardComponentProps {
  item: any; // Define a more specific type if necessary (e.g., Article, Guide, etc.)
  selected: string;
  browseByItems: any[]; // Define the appropriate type for the browseByItems array
  favourite:boolean
}

const CardComponent: React.FC<CardComponentProps> = ({ item, selected, browseByItems, favourite }) => {
  return (
    <>
      {/* <motion.div
        // className={'tile tile--350 tile--link-title-underline tile--white article flex-column'}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        exit="exiting"
        key={item.id}
      > */}
      <Link
        to={`/station/${getDynamicValueById(browseByItems, selected, 'url')}/${item.id}`}
        key={`sectors${item.id}`}
        className={'tile tile--350 tile--link-title-underline tile--white article flex-column'}
      >
        <div className="tile-contents">
          <div className="tile-header">
            {item.image_url && <img src={item.image_url} alt={`Image for ${item.title}`} />}
            <div className="title">
              <h3>{item.title}</h3>
            </div>
          </div>

          <div
            className="subtext my-s"
            dangerouslySetInnerHTML={{
              __html: item.brief ?? item.description ?? item.summary ?? item.excerpt,
            }}
          />
          <div className="subtext fs--s mt-auto">
            {formatDate(new Date(item.updated_at))}

            {favourite && (
              <div className="button-group article-actions">
                <FavouriteButton id={item.id} />
              </div>
            )}
            {/* {(selected === 'article' || selected === 'favourite') && (
              <div className="button-group article-actions">
                <FavouriteButton id={item.id} />
              </div>
            )} */}
          </div>
        </div>
      </Link>
      {/* </motion.div> */}
    </>
  );
};

export default CardComponent;
