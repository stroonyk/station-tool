import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';
import { getTitleById } from '../../../helpers/helpers';

// export interface IBreadcrumbProps {
//   categoryIds: [];
// }

const CategoryBreadcrumb: React.FC = () => {
  const stationCtx = useStationContext();
  const [name, setName] = useState('');

  useEffect(() => {
    setName(getTitleById(stationCtx.savedCategories, stationCtx.selectedCategory));
  }, [stationCtx.selectedCategory, stationCtx.savedCategories]);
  return (
    <>
      {stationCtx.selectedCategory !== null && stationCtx.selectedCategory > -1 && (
        <div>
          {/* <span className="context-span">Category</span> */}
          <Link to={`/Station/categories/${stationCtx.selectedCategory}`}>
            {/* <div style={{ padding: '8px', borderRadius: '4px' }} className="dropdown"> */}
            {name}
          </Link>
        </div>
      )}
    </>
  );
};
export default CategoryBreadcrumb;
