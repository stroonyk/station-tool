import { Link } from 'react-router-dom';
// import { useStationContext } from '../../store/station-context';
import { useEffect, useState } from 'react';
import getStation from '../../utils/getStation';
import React from 'react';

export interface ITagsProps {
  // articleId: number;
  tags: [];
}
const TagsList: React.FC<ITagsProps> = ({ tags }) => {
  // const stationCtx = useStationContext();
  // const [tags, setTags] = useState([]);

  // const hydrateTags = async (): Promise<void> => {
  //   const tags = await getStation().articles().tags().index(articleId);
  //   const tagsList = tags.tag.map(({ id, title }) => ({
  //     id,
  //     title,
  //   }));
  //   setTags(tagsList);
  // };
  // useEffect(() => {
  //   hydrateTags();
  // }, [articleId]);
  return (
    <>
      {tags && tags.length > 0 && (
        <div className="mini-tags-container">
          <span className="mini-tags-title">Tags</span>
          {tags.map(({ id, title }, index) => (
            <React.Fragment key={id}>
              <Link to={`/Station/Tags/${id}`}>
                <span className="tags-title">{title}</span>
              </Link>
              {index !== tags.length - 1 && ', '}
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default TagsList;
