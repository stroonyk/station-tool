import CustomDropdown from '../../../common/CustomDropdown';
import { getDynamicValueById } from '../../../../helpers/helpers';
import SortBy from '../../../common/SortBy';
import { useStationContext } from '../../../../store/station-context';
import { browseByItems } from './config';

export interface IHeaderProps {
  selected: string;
  sortClicked?: (sortBy: string, direction: string) => void;
}

const Header: React.FC<IHeaderProps> = ({ selected, sortClicked }) => {
  const { basePath } = useStationContext();
  const sortClickedHandler = (sortBy: string, direction: string) => {
    sortClicked?.(sortBy, direction);
  };
  const description = getDynamicValueById(browseByItems, selected, 'description');
  return (
    <>
      <div className="container">
        <div data-component="taxonomy-overview">
          <div className="taxonomy-overview-wrapper">
            <div className=" taxonomy-select--containe" style={{ display: 'flex', gap: '10px' }}>
              <h2 className="flex-row-wrap mb-s">Browse by:</h2>
              <div style={{ display: 'flex', gap: '10px' }}>
                <CustomDropdown
                  selectedId={selected}
                  items={browseByItems}
                  basePath={`${basePath}/browse?by=`}
                  label="Category"
                  selected={false}
                />
              </div>
              <h2 className="flex-row-wrap mb-s">Sort by:</h2>
              <div style={{ display: 'flex', gap: '10px' }}>
                <SortBy sortClicked={sortClickedHandler} />
              </div>
            </div>
          </div>
        </div>
        <p>{description}</p>
      </div>
    </>
  );
};

export default Header;
