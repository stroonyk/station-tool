import classNames from 'classnames';

export interface ISpinnerProps {
  small: boolean;
  inline: boolean;
}

const Spinner = ({ small, inline }: ISpinnerProps) => {
  return (
    <span
      className={classNames({
        'is-loading': true,
        'is-loading-small': small,
        'is-loading-inline': inline,
      })}
    />
  );
};

export default Spinner;
