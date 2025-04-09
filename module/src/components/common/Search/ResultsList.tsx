// import styles from './Search.module.scss';
import classNames from 'classnames';
import { useStationContext } from '../../../store/station-context';

export const ResultsList = ({ results, highlightLine, onMouseOver, onMouseOut, onResultClick }) => {
  const { basePath } = useStationContext();

  return (
    <ul className="results-list" onMouseOut={() => onMouseOut()}>
      {results.map((result, index) => (
        <li
          key={`${result.id}-${result.title}`}
          data-id={index}
          data-title={result.title}
          data-path={`${basePath}/${result.path}`}
          id={`list-item${index}`}
          className={highlightLine === index ? 'selected' : ''}
          onClick={() => onResultClick(result.path)}
          onMouseOver={(e) => onMouseOver(e.currentTarget)}
        >
          <i className="fa-solid fa-clock"></i>
          <div className="result">{result.title}</div>
        </li>
      ))}
    </ul>
  );
};
