import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';

// export interface IBreadcrumbProps {
//   categoryIds: [];
// }

const GuideBreadcrumb: React.FC = () => {
  const stationCtx = useStationContext();
  const [name, setName] = useState('');
  const getTitleById = (id) => stationCtx.savedGuides.find((guide) => guide.id === id)?.title;

  useEffect(() => {
    // debugger;
    setName(getTitleById(stationCtx.selectedGuide));
  }, [stationCtx.selectedGuide, stationCtx.savedGuides]);
  return (
    <>
      {stationCtx.selectedGuide !== null && stationCtx.selectedGuide > -1 && (
        <div>
          <span className="context-span">Guide </span>
          <Link to={`/Station/guides/${stationCtx.selectedGuide}`}>
            {/* <div style={{ padding: '8px', borderRadius: '4px' }} className="dropdown"> */}
            {name}
          </Link>
        </div>
      )}
    </>
  );
};
export default GuideBreadcrumb;
