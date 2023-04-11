import { useState, useEffect } from 'react';
import { IBannerStatusProps } from './interfaces';
import Callout from '../../../components/common/Callout';
import { PiaStatuses } from '../../../constant/constant';
import { isMPORole } from '../../../utils/helper.util';

const BannerStatus = ({ pia }: IBannerStatusProps) => {
  const [bannerMessage, setBannerMessage] = useState<string>('');
  useEffect(() => {
    if (pia.status === PiaStatuses.INCOMPLETE) {
      setBannerMessage(
        'Warning: Your Ministry Privacy Office (MPO) can’t see or help you with this PIA until you click “Submit”. ',
      );
    } else if (pia.status === PiaStatuses.MPO_REVIEW) {
      if (isMPORole()) {
        setBannerMessage(
          'To submit this PIA to PCT for review, download it as a PDF and send it to PCT via email.',
        );
      } else {
        setBannerMessage(
          ' Your PIA is being reviewed by your Ministry Privacy Office (MPO). Your MPO will contact you once it is reviewed.',
        );
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
