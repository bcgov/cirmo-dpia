import { IPiaForm } from '../types/interfaces/pia-form.interface';

type SnowPlowProps = {
  pia: IPiaForm;
};

const useSnowPlow = ({ pia }: SnowPlowProps) => {
  const sendSnowplowStatusChangeCall = (completedStatus?: boolean) => {
    window.snowplow('trackSelfDescribingEvent', {
      schema: 'iglu:ca.bc.gov.cirmo/dpia_progress/jsonschema/1-0-0',
      data: {
        id: pia?.id,
        title: pia?.title?.slice(0, 64),
        state: completedStatus ? `${pia?.status}-COMPLETED` : pia?.status,
        ministry: pia?.ministry,
        branch: pia?.branch,
      },
    });
  };
  return { sendSnowplowStatusChangeCall };
};

export default useSnowPlow;
