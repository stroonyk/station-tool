import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStationContext } from '../../../store/station-context';

// export interface IBreadcrumbProps {
//   categoryIds: [];
// }

const SectorBreadcrumb: React.FC = () => {
  const stationCtx = useStationContext();
  const [name, setName] = useState('');
  const getTitleById = (id) => stationCtx.savedSectors.find((sector) => sector.id === id)?.title;

  useEffect(() => {
    // debugger;

    setName(getTitleById(stationCtx.selectedSector));
  }, [stationCtx.selectedSector, stationCtx.savedSectors]);
  return (
    <>
      {stationCtx.selectedSector !== null && stationCtx.selectedSector > -1 && (
        <div className="mini-sector-container">
          <span className="mini-sector-title">Sector</span>
          <Link to={`/Station/sectors/${stationCtx.selectedSector}`}>
            {/* <div style={{ padding: '8px', borderRadius: '4px' }} className="dropdown"> */}
            <span className="sector-title">{name}</span>
          </Link>
        </div>
      )}
    </>
  );
};
export default SectorBreadcrumb;
