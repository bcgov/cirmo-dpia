import { IPiaForm } from '../../types/interfaces/pia-form.interface';
import { statusList } from './statusList';
import { getUserRole } from '../../utils/user';

export const getUserPrivileges = (pia: IPiaForm) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
  return statusList?.(pia)?.[pia?.status!]?.Privileges[getUserRole()];
};
