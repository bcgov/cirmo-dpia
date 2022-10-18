import { StageProps, StagesArrayProps } from './interfaces';
import Stage from './Stage';

const StagesArray = ({ stages }: StagesArrayProps) => {
  return (
    <div className="stages-wrapper">
      {stages.map((stage: StageProps) => {
        return <Stage key={stage.id} {...stage} />;
      })}
    </div>
  );
};

export default StagesArray;
