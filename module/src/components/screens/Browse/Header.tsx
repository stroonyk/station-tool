import { useEffect, useState } from 'react';
// import AppConfig from '../../../../helpers/AppConfig';
import CustomDropdown from '../../common/CustomDropdown';
import { getDynamicValueById } from '../../../helpers/helpers';

export interface IHeaderProps {
  selected: string;
  items: [];
}

const Header: React.FC<IHeaderProps> = ({ selected, items }) => {
  // console.log('Header selected is ' + selected);
  // debugger;
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
                  basePath="/station/browse?by="
                  label="Category"
                  selected={false}
                />
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
