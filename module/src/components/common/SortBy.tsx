import { useEffect, useRef, useState } from 'react';

interface ISortByProps {
  sortClicked: (sortBy: string, sortDirection: string) => void;
}

export const sortByItems = [
  { id: 'updated_at', title: 'Date' },
  { id: 'title', title: 'Name' },
];

export const sortDirections = [
  { id: 'asc', title: 'Ascending' },
  { id: 'desc', title: 'Descending' },
];

const SortBy: React.FC<ISortByProps> = ({ sortClicked }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isDirOpen, setIsDirOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [selectedSort, setSelectedSort] = useState(sortByItems[0]);
  const [selectedDirection, setSelectedDirection] = useState(sortDirections[0]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
        setIsDirOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortChange = (item: (typeof sortByItems)[0]) => {
    setSelectedSort(item);
    setIsSortOpen(false);
    sortClicked(item.id, selectedDirection.id);
  };

  const handleDirectionChange = (item: (typeof sortDirections)[0]) => {
    setSelectedDirection(item);
    setIsDirOpen(false);
    sortClicked(selectedSort.id, item.id);
  };

  return (
    <div className="sort-container" ref={dropdownRef} style={{ display: 'flex' }}>
      <div className="dropdown">
        <button className="dropdown-btn" onClick={() => setIsSortOpen(!isSortOpen)}>
          {selectedSort.title}
        </button>
        {isSortOpen && (
          <div className="dropdown-menu">
            {sortByItems.map((item) => (
              <div key={item.id} className="dropdown-item dropdown-link" onClick={() => handleSortChange(item)}>
                <div className={'dropdown-link'}>{item.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <span style={{ width: '8px' }}></span> {/* Spacer */}
      <div className="dropdown">
        <button className="dropdown-btn" onClick={() => setIsDirOpen(!isDirOpen)}>
          {selectedDirection.title}
        </button>
        {isDirOpen && (
          <div className="dropdown-menu">
            {sortDirections.map((item) => (
              <div key={item.id} className="dropdown-item dropdown-link" onClick={() => handleDirectionChange(item)}>
                <div className={'dropdown-link'}>{item.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortBy;
