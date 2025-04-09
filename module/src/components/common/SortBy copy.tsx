import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface ISortByProps {
  sortClicked: (sortBy: string) => void;
}

export const sortByItems = [
  {
    id: 'updated_at',
    title: 'Date',
  },
  {
    id: 'title',
    title: 'Name',
  },
];

const SortBy: React.FC<ISortByProps> = ({ sortClicked }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [selectedItem, setSelectedItem] = useState(sortByItems[0].title);
  // const selectedItem = items.find((item) => item.id === selectedId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const itemClicked = (id: string, title: string, event: MouseEvent) => {
    // alert(title);
    setSelectedItem(title);
    sortClicked(id);

    setIsOpen(false);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      {/* <button className={`dropdown-btn ${selected ? 'selected' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {selectedItem ? selectedItem.title : label}
      </button> */}
      <button className={`dropdown-btn`} onClick={() => setIsOpen(!isOpen)}>
        {selectedItem}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {sortByItems.map(({ id, title }) => (
            <div key={id} className="dropdown-item">
              <div className="dropdown-link" onClick={(event) => itemClicked(id, title, event)}>
                {title}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortBy;
