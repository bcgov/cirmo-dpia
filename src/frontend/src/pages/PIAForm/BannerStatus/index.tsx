import { IBannerStatusProps } from '../helpers/interfaces';
import Callout from '../../../components/common/Callout';
import { getUserRole } from '../../../utils/user';
import { statusList } from '../../../utils/statusList/statusList';
const BannerStatus = ({ pia }: IBannerStatusProps) => {
  const populateBanner = () => {
    const currentStatus = pia.status || 'Completed';
    const role = getUserRole();
    if (statusList(null)[currentStatus].Privileges[role]?.banner) {
      return Object(statusList(null)[currentStatus].Privileges)[role].banner;
    }
    return statusList(null)[currentStatus].banner;
  };

  return (
    populateBanner() && (
      <div className="mb-5">
        <Callout text={populateBanner()} bgWhite />
      </div>
    )
  );
};

export default BannerStatus;
