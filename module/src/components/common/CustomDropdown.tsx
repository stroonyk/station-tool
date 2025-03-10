import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface DropdownProps {
  items: { id: number | string; title: string }[];
  basePath: string;
  label: string;
  selectedId?: number | string;
  selected: boolean; // If true, apply a different button style
}

const Dropdown: React.FC<DropdownProps> = ({ items, basePath, label, selectedId, selected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const selectedItem = items.find((item) => item.id === selectedId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className={`dropdown-btn ${selected ? 'selected' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {selectedItem ? selectedItem.title : label}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {items.map(({ id, title }) => (
            <div key={id} className="dropdown-item">
              <Link to={`${basePath}${id}`} className="dropdown-link" onClick={() => setIsOpen(false)}>
                {title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
