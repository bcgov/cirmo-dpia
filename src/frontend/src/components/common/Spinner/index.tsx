import { SpinnerProps } from './interfaces';

const Spinner = ({ show = true }: SpinnerProps) => {
  if (!show) return <></>;

  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Spinner;
