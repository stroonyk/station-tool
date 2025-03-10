import Cards from './Cards';
import { useStationContext } from '../../../../store/station-context';

const CardsContainer = () => {
  const stationCtx = useStationContext();
  const className = `dashboard-cards cards${stationCtx.questionnaires.length}`;

  if (!stationCtx.loadingObj.loading && stationCtx.questionnaires.length === 0) {
    return null;
  }

  return (
    <>
      {stationCtx.questionnaires.length > 0 ? (
        <div className={className}>
          <Cards />
        </div>
      ) : (
        <div className="no-cards-available">Sorry, you currently have no questionnaires available.</div>
      )}
    </>
  );
};

export default CardsContainer;
