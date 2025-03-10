import React from 'react';
import { getTitleById } from '../../helpers/helpers';

interface TitleContainerProps {
  categories: { id: number; title: string }[];
  id: number;
}

const TitleContainer: React.FC<TitleContainerProps> = ({ categories, id }) => {
  // debugger;
  const title = getTitleById(categories, id);
  return (
    <h2 style={{ marginTop: '20px', marginBottom: '0px' }} className="container">
      {title}
    </h2>
  );
};

export default TitleContainer;
