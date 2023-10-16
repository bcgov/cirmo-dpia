import { IPiaForm } from '../../types/interfaces/pia-form.interface';
import { getUserRole } from '../../utils/user';
import { PiaStatuses } from '../../constant/constant';
import { statusList } from './statusList';

export const getUserPrivileges = (pia: IPiaForm) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
  return statusList?.(pia)?.[pia?.status!]?.Privileges[getUserRole()];
};

export const getUserPrivilegesByStatus = (
  status: PiaStatuses | string | undefined,
) => {
  if (!status) return {};
  return statusList?.(null)?.[status]?.Privileges[getUserRole()];
};
