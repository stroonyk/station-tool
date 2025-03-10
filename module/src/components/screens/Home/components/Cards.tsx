import { IQuestionnaire } from '@rradar/dashboard-sdk';
import { useStationContext } from '../../../../store/station-context';
import Card from './Card';

const Cards = () => {
  const stationCtx = useStationContext();
  const questionnaires = stationCtx.questionnaires;

  return (
    <>
      {questionnaires.map((questionnaire: IQuestionnaire, index: string) => {
        return <Card questionnaire={questionnaire} index={index} key={questionnaire.id} />;
      })}
    </>
  );
};

export default Cards;
