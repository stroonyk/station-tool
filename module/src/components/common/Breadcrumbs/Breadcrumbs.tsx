import { useStationContext } from '../../../store/station-context';
import CategoryBreadcrumb from './CategoryBreadcrumb';
import GuideBreadcrumb from './GuideBreadcrumb';
import SectorBreadcrumb from './SectorBreadcrumb';

export interface IFilterProps {
  selectedCategory?: number;
  selectedGuide?: number;
  selectedSector?: number;
}

const Breadcrumbs: React.FC<IFilterProps> = () => {
  const stationCtx = useStationContext();
  return (
    <>
      {/* <div className="page-header" style={{ padding: '0px 0px' }}> */}
      <div className="container page-header-breadcrumbs">
        {/* <div style={{ display: 'flex', gap: '15px' }}> */}
        <div style={{ gap: '15px' }}>
          <CategoryBreadcrumb />
          {/* <GuideBreadcrumb />
          <SectorBreadcrumb /> */}
          {/* <TemplateList /> */}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Breadcrumbs;
