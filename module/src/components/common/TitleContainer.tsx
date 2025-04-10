import React from 'react';
import { getTitleById } from '../../helpers/helpers';
import { useStationContext } from '../../store/station-context';

interface TitleContainerProps {
  id: number;
}

const TitleContainer: React.FC<TitleContainerProps> = ({ id }) => {
  const { savedCategories } = useStationContext();

  const title = getTitleById(savedCategories, id);
  return <h2 className="container h2title">{title}</h2>;
};

export default TitleContainer;
