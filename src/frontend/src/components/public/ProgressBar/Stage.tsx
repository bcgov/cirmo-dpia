import { ReactElement } from 'react';
import { StageProps } from './interfaces';

const Stage = ({ id, label, icon, active }: StageProps): ReactElement => {
  return (
    <div className={`stage-block ${active ? 'active' : ''}`}>
      <div className="circle">
        <div className="inner-circle">
          <img src={icon} />
        </div>
      </div>
      <p className="stage-label">{label}</p>
    </div>
  );
};

export default Stage;
