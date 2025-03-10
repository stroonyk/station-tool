// import styles from './Search.module.scss';
import classNames from 'classnames';

export const ResultsList = ({ results, highlightLine, onMouseOver, onMouseOut, onResultClick }) => (
  <ul className={'results-list'} onMouseOut={() => onMouseOut()}>
    {results.map((result, index) => (
      <li
        key={`${result.id}-${result.title}`}
        data-id={index}
        data-title={result.title}
        data-path={result.path}
        id={`list-item${index}`}
        className={highlightLine === index ? 'selected' : ''}
        // className={classNames({
        //   [styles.selected]: highlightLine === index,
        // })}
        onClick={() => onResultClick(result.path)}
        onMouseOver={(e) => onMouseOver(e.currentTarget)}
      >
        <i className="fa-solid fa-clock"></i>
        <div className={'result'}>{result.title}</div>
      </li>
    ))}
  </ul>
);
