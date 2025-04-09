import { useEffect, useState } from 'react';
// import AppConfig from '../../../../helpers/AppConfig';
import CustomDropdown from '../../common/CustomDropdown';
import { getDynamicValueById } from '../../../helpers/helpers';
import SortBy from '../../common/SortBy';
import { useStationContext } from '../../../store/station-context';

export interface IHeaderProps {
  selected: string;
  items: [];
  sortClicked?: (sortBy: string) => void;
}

const Header: React.FC<IHeaderProps> = ({ selected, items, sortClicked }) => {
  // console.log('Header selected is ' + selected);
  // debugger;
  const { basePath } = useStationContext();
  const sortClickedHandler = (sortBy: string, direction: string) => {
    // alert('sort by' + sortBy);
    sortClicked?.(sortBy, direction); // Call the parent component's sortClicked function with the selected sort option.
  };
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
                  items={items}
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
        <p>{getDynamicValueById(items, selected, 'description')}</p>
      </div>
    </>
  );
};

export default Header;
