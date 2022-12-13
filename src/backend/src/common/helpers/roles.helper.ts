import { IRoleInfo, Roles } from '../constants/roles.constants';
import { RolesEnum } from '../enums/roles.enum';
import { UserTypesEnum } from '../enums/users.enum';

/**
 * @method filterMpoRoles
 * @description - using supplied user roles, the method filters MPO roles information
 *
 * @param roles
 */
export const filterMpoRoles = (roles: RolesEnum[]) => {
  const mpoRoles: IRoleInfo[] = roles
    ?.filter((role) => Roles[role].user === UserTypesEnum.MPO)
    .map((role) => Roles[role]);

  return mpoRoles || [];
};
