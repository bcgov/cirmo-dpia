import { PiaStatuses } from '../../../../../constant/constant';
import { useContext } from 'react';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../../contexts/PiaFormContext';
import { FillOutFullPIA } from './components/FillOutFullPIA';
import { NotifyMPO } from './components/NotifyMPO';
import { PIALifecycle } from './components/PIALifecycle';
import { SubmitForMPO } from './components/SubmitForMPO';

const NextStepsPI = () => {
  const { pia } = useContext<IPiaFormContext>(PiaFormContext);

  return (
    <section className="">
      {pia?.status === PiaStatuses.INCOMPLETE && (
        <>
          <FillOutFullPIA />
          <SubmitForMPO />
        </>
      )}
      {pia?.status === PiaStatuses.MPO_REVIEW && <NotifyMPO />}
      <PIALifecycle />
    </section>
  );
};

export default NextStepsPI;
