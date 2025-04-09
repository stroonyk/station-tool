import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { downloadTemplate, getTemplates } from '../../../helpers/helpers';
import { formatDate, fileTypeIcons } from '../../../helpers/helpers';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../../common/SkeletonLoader';
import usePageReset from '../../../hooks/usePageReset';
import Header from './Header';

export interface ITemplateProps {
  refresh: boolean;
}
const Templates: React.FC<ITemplateProps> = ({ refresh }) => {
  const { id } = useParams();
  usePageReset(id);
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchList = async () => {
      const list = await getTemplates(1);
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
            <a
              key={item.id}
              className="tile tile--350 tile--link-title-underline tile--white article flex-column"
              onClick={() => downloadTemplate(item.id)}
            >
              <div className="tile-contents">
                <div className="tile-header">
                  <div className="title">
                    <h2>{item.title}</h2>
                  </div>
                </div>
                <div className="subtext my-s">{item.description}</div>
                <div className="subtext fs--s mt-auto">
                  {formatDate(new Date(item.updated_at))}
                  <span className="list-icon">
                    <i className={`fas ${fileTypeIcons[item.file_type] || 'fa-file'}`}></i>
                  </span>
                </div>
              </div>
            </a>
          ))
        ) : (
          <div>No Templates Available</div>
        )}
      </div>
    </>
  );
};

export default Templates;
