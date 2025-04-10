import React from 'react';
import { getDescriptionById } from '../../helpers/helpers';
import { useStationContext } from '../../store/station-context';

interface TitleContainerProps {
  id: number;
}

const DescriptionContainer: React.FC<TitleContainerProps> = ({ id }) => {
  const { savedCategories } = useStationContext();
  const title = getDescriptionById(savedCategories, id);

  return (
    <div style={{ marginBottom: '20px', marginTop: '0px' }} className="container">
      <div dangerouslySetInnerHTML={{ __html: title }} />
    </div>
  );
};

export default DescriptionContainer;
