import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { IRequest } from '../../../common/interfaces/request.interface';

/**
 * This Role Guard shields a resource -endpoint or controller, from unauthorized access
 * @Roles decorator, if provided to an endpoint, will allow access only to the users with matching SSO client role
 *
 * Permissive - by default - will consider endpoint open if @Roles not specified
 * Matching Strategy - ANY
 * RoleMerge Strategy - Not supported - OVERRIDE by default
 *
 * @Usage
 * @Roles(['MPO-FIN'])
 *
 * In practice, @Roles decorator should only be used on a resource with restrictions
 * By default the resource stay is permissive
 *
 * This method, if authorized, also appends roles to the HTTP request. `request.userRoles`
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Grab the set of roles which were specified in the endpoint @Roles annotation
    //  as roles allowed to access the endpoint
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // Let the request through if no roles provided
    if (!roles) return true;

    // Grab the user data off the request - this should have been populated in the Auth guard
    const request: IRequest = context.switchToHttp().getRequest();

    // Reject if the user is not authenticated
    // AuthGuard only appends user and the token if the request is authenticated
    const { user, accessTokenJWT: accessToken } = request;
    if (!user || !accessToken) {
      console.warn(
        'No user or access token information found in the request, is the AuthGuard first in the chain?',
      );
      throw new UnauthorizedException('[Error] Invalid user info');
    }

    // Extract Payload from the Token. Reject if unparsed.
    let payload: KeycloakUser = null;
    try {
      payload = JSON.parse(
        Buffer.from(accessToken.split('.')[1], 'base64').toString(),
      ) as KeycloakUser;
    } catch (e) {
      console.warn('Could not parse the JWT access token');
      throw new UnauthorizedException('[Error] Invalid user access');
    }

    // save request metadata with the user roles
    request.userRoles = payload.client_roles;

    // [Matching Strategy - ANY] if any of the provided role matches, the user is allowed
    const isAuthorized = roles.some((r) => payload.client_roles.includes(r));

    return isAuthorized;
  }
}
