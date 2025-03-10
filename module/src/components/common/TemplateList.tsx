import React, { useState, useEffect, useRef } from 'react';
import { useStationContext } from '../../store/station-context';
import { downloadTemplate } from '../../helpers/helpers';

interface ITemplateProps {
  // templates: { id: number; title: string }[];
}

const TemplateList: React.FC<ITemplateProps> = () => {
  const stationCtx = useStationContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Ref to track the dropdown container

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Close dropdown if click is outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // Listen for click events on the document
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Clean up the listener when the component is unmounted
    };
  }, []);

  const handleTemplateClick = (id: number) => {
    downloadTemplate(id);
    setIsOpen(false); // Close the dropdown when an item is clicked
  };

  return (
    <>
      {stationCtx.savedTemplates.length > 0 && (
        <div className="mini-template-container">
          <div className="mini-template-header" onClick={toggleDropdown}>
            <span>Select Template</span>
            {/* <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span> */}
          </div>

          {isOpen && (
            <div ref={dropdownRef} className="mini-template-dropdown">
              {stationCtx.savedTemplates.map(({ id, title }) => (
                <div
                  key={id}
                  className="mini-template-div"
                  onClick={() => handleTemplateClick(id)} // Close dropdown on click
                >
                  <span className="mini-template-title">{title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TemplateList;
