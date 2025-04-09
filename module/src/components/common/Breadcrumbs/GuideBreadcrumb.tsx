import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';

// export interface IBreadcrumbProps {
//   categoryIds: [];
// }

const GuideBreadcrumb: React.FC = () => {
  const { selectedGuide, savedGuides, basePath } = useStationContext();
  const [name, setName] = useState('');
  const getTitleById = (id) => savedGuides.find((guide) => guide.id === id)?.title;

  useEffect(() => {
    // debugger;
    setName(getTitleById(selectedGuide));
  }, [selectedGuide, savedGuides]);
  return (
    <>
      {selectedGuide !== null && selectedGuide > -1 && (
        <div>
          <span className="context-span">Guide </span>
          <Link to={`${basePath}/guides/${selectedGuide}`}>
            {/* <div style={{ padding: '8px', borderRadius: '4px' }} className="dropdown"> */}
            {name}
          </Link>
        </div>
      )}
    </>
  );
};
export default GuideBreadcrumb;
