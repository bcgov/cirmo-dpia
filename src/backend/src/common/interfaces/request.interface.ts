import { Request } from 'express';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { RolesEnum } from '../enums/roles.enum';

export interface IRequest extends Request {
  accessTokenJWT?: string;
  user?: KeycloakUser;
  userRoles?: Array<RolesEnum>;
}
