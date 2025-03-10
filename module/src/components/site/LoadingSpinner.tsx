import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from '../../state/index';
import { setAsLoaded, setAsLoading } from '../../state/modules/loading';
import Spinner from './Spinner';

type Loading = ReturnType<typeof mapStateToProps>['loading'];

export interface ILoadingSpinnerParams {
  setAsLoaded: (typeof mapDispatchToProps)['setAsLoaded'];
  setAsLoading: (typeof mapDispatchToProps)['setAsLoading'];
  loading?: Loading;
}

type Props = {
  render(loading: ILoadingSpinnerParams): JSX.Element;
} & {
  loading?: Loading;
  inline?: boolean;
  small?: boolean;
} & typeof mapDispatchToProps;

const LoadingSpinner: React.FunctionComponent<Props> = ({
  loading,
  small,
  inline,
  setAsLoaded: SaL,
  setAsLoading: SaLo,
  render,
}: Props) => {
  return (
    <>
      {loading ? <Spinner inline={inline} small={small} /> : null}
      {render({
        setAsLoaded: SaL,
        setAsLoading: SaLo,
        loading,
      })}
    </>
  );
};

const mapDispatchToProps = {
  setAsLoaded,
  setAsLoading,
};

const mapStateToProps = (state: Store) => ({
  loading: state.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingSpinner);
