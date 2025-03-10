import { IQuestionnaire } from '@rradar/dashboard-sdk';
import PolarChart from '../../../charts/PolarChart';
import { motion } from 'framer-motion';
import { dashboardVariants } from '../../../shared/animations';
import { noTooltipOrLegendptions } from './config';
import { NAV_TAB } from '../../../../store/stationReducer';
import { useStationContext } from '../../../../store/station-context';

interface ICard {
  questionnaire: IQuestionnaire;
  index: string;
}

const Cards = ({ questionnaire, index }: ICard) => {
  const stationCtx = useStationContext();

  const onClickTitleHandler = (id: any) => {
    window.location.href = `/${id}`;
    stationCtx.showAllQuestions(id);
  };

  return (
    <>
      <motion.div
        className="dashboard-card"
        initial="hidden"
        animate="visible"
        variants={dashboardVariants}
        exit="hidden"
        key={'dashboard-card' + index}
        onClick={() => onClickTitleHandler(questionnaire.id)}
      >
        <span className="title">
          <a onClick={() => onClickTitleHandler(questionnaire.id)}>{questionnaire.name}</a>
        </span>

        <div className="chart-and-monitor">
          <div>
            <PolarChart
              areas={questionnaire.areas}
              options={noTooltipOrLegendptions}
              onClickTab={NAV_TAB.TASKS}
              questionnaireId={questionnaire.id}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Cards;
