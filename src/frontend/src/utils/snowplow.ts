import { IPiaForm } from '../types/interfaces/pia-form.interface';

// Define the props for the `useSnowPlow` hook
type SnowPlowProps = {
  pia: IPiaForm;
};

// Define the `useSnowPlow` hook
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

  // Return the `sendSnowplowStatusChangeCall` function
  return { sendSnowplowStatusChangeCall };
};

export default useSnowPlow;
