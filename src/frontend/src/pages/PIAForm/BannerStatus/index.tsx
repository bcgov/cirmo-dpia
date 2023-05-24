import { IBannerStatusProps } from './interfaces';
import Callout from '../../../components/common/Callout';
import { PiaStatuses } from '../../../constant/constant';
import { roleCheck } from '../../../utils/helper.util';
import { statusList } from '../../../utils/status';
const BannerStatus = ({ pia }: IBannerStatusProps) => {
  const populateBanner = () => {
    const userRoles = roleCheck();
    const currentStatus = pia.status || 'Completed';
    if (userRoles !== undefined && userRoles.roles !== undefined) {
      const role = userRoles.roles[0];
      if (role in statusList[currentStatus].Privileges) {
        return Object(statusList[currentStatus].Privileges)[role].banner;
      }
    }
    return statusList[currentStatus].banner;
  };

  return pia.status !== PiaStatuses.EDIT_IN_PROGRESS ? (
    <div className="mb-5">
      <Callout text={populateBanner()} bgWhite />
    </div>
  ) : null;
};

export default BannerStatus;
