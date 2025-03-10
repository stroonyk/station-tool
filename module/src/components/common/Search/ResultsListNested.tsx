// import styles from './Search.module.scss';
import classNames from 'classnames';

export const NestedResultsList = ({ results, highlightLine, onMouseOver, onMouseOut, onResultClick }) => {
  let counter = -1;

  return (
    <ul onMouseOut={() => onMouseOut()}>
      {results.map((result, topLevelIndex) => (
        <li key={`full-${topLevelIndex}`}>
          {/* Render toplevel title */}
          {result.title !== 'searches' && (
            // <div className={styles.subtitle} onClick={() => onResultClick(result.path)}>
            <div className={'subtitle'} onClick={() => onResultClick(result.path)}>
              {result.title}
            </div>
          )}
          {/* Render nested results if present */}
          {result.results.length > 0 && (
            <ul className={'results-list'}>
              {result.results.map((subResult, subIndex) => {
                counter++;
                return (
                  <li
                    key={`sub-${topLevelIndex}-${subIndex}`}
                    data-id={counter}
                    data-title={subResult.title}
                    data-path={subResult.path}
                    className={highlightLine === counter ? 'selected' : ''}
                    //   [styles.selected]: highlightLine === counter,
                    // })}
                    onClick={() => onResultClick(subResult.path)}
                    onMouseOver={(e) => onMouseOver(e.currentTarget)}
                  >
                    <i
                      className={classNames('fa-regular', {
                        'fa-clock-rotate-left': result.title === 'searches',
                        'fa-solid fa-file': result.title !== 'searches',
                      })}
                    ></i>
                    {/* <div className={styles.result}> */}
                    <div className={'result'}>
                      {subResult.title}
                      {/* {result.title !== 'searches' && <div className={styles.visited}>Visited {subResult.visited}</div>} */}
                      {result.title !== 'searches' && <div className={'visited'}>Visited {subResult.visited}</div>}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};
