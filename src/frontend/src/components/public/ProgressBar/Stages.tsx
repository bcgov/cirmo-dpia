import { StageProps, StagesProps } from './interfaces';
import Stage from './Stage';

const Stages = ({ stages }: StagesProps) => {
  return (
    <div className="stages-wrapper">
      {stages.map((stage: StageProps) => {
        return <Stage key={stage.id} {...stage} />;
      })}
    </div>
  );
};

export default Stages;
