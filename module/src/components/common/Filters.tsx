import { Link } from 'react-router-dom';
import CustomDropdown from './CustomDropdown';
import { useStationContext } from '../../store/station-context';
import { useLocation } from 'react-router-dom';
import AppConfig from '../../helpers/AppConfig';

export interface IFilterProps {
  selectedCategory?: number;
  selectedGuide?: number;
  selectedSector?: number;
}

const Filters: React.FC<IFilterProps> = () => {
  const stationCtx = useStationContext();
  const appConfig = AppConfig.getInstance();
  const location = useLocation();

  if (appConfig.getConfig().classic) {
    return null;
  }

  const pages = [
    { name: 'Browse', path: '/browse', isLink: true },
    { name: 'Categories', path: '/categories', items: stationCtx.savedCategories, basePath: '/station/categories/' },
    { name: 'Guides', path: '/guides', items: stationCtx.savedGuides, basePath: '/station/guides/' },
    { name: 'Sectors', path: '/sectors', items: stationCtx.savedSectors, basePath: '/station/sectors/' },
    { name: 'Templates', path: '/templates', isLink: true },
  ];

  return (
    <div className="container station-menu-bar">
      <div style={{ display: 'flex', gap: '10px' }}>
        {pages.map((page) => {
          const isCurrentPage = location.pathname.includes(page.path);
          return page.isLink ? (
            <Link to={`/Station${page.path}`} key={page.name}>
              <button className={`dropdown-btn ${isCurrentPage ? 'selected' : ''}`}>{page.name}</button>
            </Link>
          ) : (
            <CustomDropdown
              key={page.name}
              items={page.items || []}
              basePath={page.basePath}
              label={page.name}
              selected={isCurrentPage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
