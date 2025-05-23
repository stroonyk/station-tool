import { Link } from 'react-router-dom';
import React from 'react';
import { useStationContext } from '../../store/station-context';

export interface ITagsProps {
  // articleId: number;
  tags: [];
}
const TagsList: React.FC<ITagsProps> = ({ tags }) => {
  const { basePath } = useStationContext();
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
              <Link to={`${basePath}/Tags/${id}`}>
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
