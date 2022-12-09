import { Request } from 'express';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';

export interface IRequest extends Request {
  accessTokenJWT?: string;
  user?: KeycloakUser;
  userRoles?: string[];
}
