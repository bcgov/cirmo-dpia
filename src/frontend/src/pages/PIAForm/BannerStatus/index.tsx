import { useState, useEffect } from 'react';
import { IBannerStatusProps } from './interfaces';
import Callout from '../../../components/common/Callout';
import { PiaStatuses } from '../../../constant/constant';
import { isMPORole } from '../../../utils/helper.util';
import Messages from './messages';
const BannerStatus = ({ pia }: IBannerStatusProps) => {
  const [bannerMessage, setBannerMessage] = useState<string>('');
  useEffect(() => {
    if (pia.status === PiaStatuses.INCOMPLETE) {
      setBannerMessage(Messages.InCompleteStatusCalloutText.Drafter.en);
    } else if (pia.status === PiaStatuses.MPO_REVIEW) {
      if (isMPORole()) {
        setBannerMessage(Messages.MPOReviewStatusCalloutText.MPO.en);
      } else {
        setBannerMessage(Messages.MPOReviewStatusCalloutText.Drafter.en);
      }
    }
  }, [pia.status]);

  return pia.status !== PiaStatuses.EDIT_IN_PROGRESS ? (
    <div className="mb-5">
      <Callout text={bannerMessage} bgWhite />
    </div>
  ) : null;
};

export default BannerStatus;
