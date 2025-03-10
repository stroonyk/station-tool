import React from 'react';
import { getDescriptionById } from '../../helpers/helpers';

interface TitleContainerProps {
  categories: { id: number; title: string }[];
  id: number;
}

const DescriptionContainer: React.FC<TitleContainerProps> = ({ categories, id }) => {
  const title = getDescriptionById(categories, id);

  return (
    <div style={{ marginBottom: '20px', marginTop: '0px' }} className="container">
      <div dangerouslySetInnerHTML={{ __html: title }} />
    </div>
  );
};

export default DescriptionContainer;
