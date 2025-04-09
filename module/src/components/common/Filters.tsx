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
  const { savedCategories, savedGuides, savedSectors, basePath } = useStationContext();
  const appConfig = AppConfig.getInstance();
  const location = useLocation();

  if (appConfig.getConfig().classic) {
    return null;
  }

  const pages = [
    { name: 'Browse', path: 'browse', isLink: true },
    { name: 'Categories', path: 'categories', items: savedCategories },
    { name: 'Guides', path: 'guides', items: savedGuides },
    { name: 'Sectors', path: 'sectors', items: savedSectors },
    { name: 'Templates', path: 'templates', isLink: true },
  ];
  // debugger;
  return (
    <div className="container station-menu-bar">
      <div style={{ display: 'flex', gap: '10px' }}>
        {pages.map((page) => {
          const isCurrentPage = location.pathname.includes(page.path);
          return page.isLink ? (
            <Link to={`${basePath}/${page.path}`} key={page.name}>
              <button className={`dropdown-btn ${isCurrentPage ? 'selected' : ''}`}>{page.name}</button>
            </Link>
          ) : (
            <CustomDropdown
              key={page.name}
              items={page.items || []}
              basePath={`${basePath}/${page.path}/`}
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
