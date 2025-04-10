import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTemplates } from '../../../services/station';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../../common/SkeletonLoader';
import usePageReset from '../../../hooks/usePageReset';
import Header from './Components/Header';
import CardComponent from '../../common/CardComponent';
import { useStationContext } from '../../../store/station-context';

export interface ITemplateProps {
  refresh: boolean;
}
const Templates: React.FC<ITemplateProps> = ({ refresh }) => {
  const { id } = useParams();
  const { stationSDK } = useStationContext();
  usePageReset(id);
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchList = async () => {
      const list = await getTemplates(stationSDK, 1);
      setTemplates(list);
      setLoading(false);
    };

    fetchList();
  }, [id]);

  useEffect(() => {
    refresh && navigate('/Station');
  }, [refresh]);

  return (
    <>
      <Header />
      <div className="container tile-list template">
        {loading ? (
          <SkeletonLoader />
        ) : templates && templates.length > 0 ? (
          templates.map((item) => (
            <CardComponent isTemplate={true} key={item.id} item={item} favourite={false} templateId={item.id} />
          ))
        ) : (
          <div>No Templates Available</div>
        )}
      </div>
    </>
  );
};

export default Templates;
