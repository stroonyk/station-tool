import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export interface ISearchHistoryItemProps {
  term: string;
  callback: () => void;
}

export function SearchHistoryItem(
  props: ISearchHistoryItemProps
): React.ReactElement {
  return (
    <div className="search-results--history" onClick={() => props.callback()}>
      <FontAwesomeIcon icon={['fal', 'long-arrow-left']} />
      {props.term}
    </div>
  );
}
