import * as React from 'react';

export interface ILoadingInjectedProps {
  loading: boolean;
  setLoading: (b: boolean) => void;
}

export interface ILoaderProps {
  render: (props: ILoadingInjectedProps) => React.ReactNode;
}

export interface ILoaderState {
  loading: boolean;
}

export class Loader extends React.Component<ILoaderProps, ILoaderState> {
  public state: ILoaderState = {
    loading: false,
  };

  public setLoading = (b: boolean) => {
    this.setState({
      loading: b,
    });
  };

  render() {
    return (
      <div className="station-form">
        {this.props.render({
          loading: this.state.loading,
          setLoading: this.setLoading,
        })}
      </div>
    );
  }
}
