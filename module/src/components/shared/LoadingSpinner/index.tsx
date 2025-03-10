import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classnames from 'classnames';

export interface ILoadingSpinnerProps {
  isLoading: boolean;
}
export interface ILoadingSpinnerState {
  loading: boolean;
}

export interface ILoadingSpinnerInjectedProps {
  loading: ILoadingSpinnerState['loading'];
  setAsLoaded: () => void;
  setAsLoading: () => void;
}

export function LoadingSpinner({ isLoading }: ILoadingSpinnerProps) {
  const div = document.body.querySelector('#loading');
  if (div) {
    // ReactDOM.render(
    //   <div
    //     className={classnames({
    //       'is-loading': isLoading,
    //     })}
    //   >
    //   </div>
    //   ,
    //   div
    // )
  }
  return <></>;
}
