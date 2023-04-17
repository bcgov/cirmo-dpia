import { AppTokensDto } from 'src/modules/auth/dto/app-tokens.dto';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';

export const accessTokenMock =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export const appTokensDtoMock: AppTokensDto = {
  access_token: accessTokenMock,
  refresh_token: 'refresh-token',
};
export const keycloakUserMock: KeycloakUser = {
  idir_user_guid: 'AAA00001B22C333DD4EEEEE55F6666G77',
  idir_username: 'TEST',
  email_verified: false,
  name: 'User, Test CITZ:EX',
  preferred_username: 'AAA00001B22C333DD4EEEEE55F6666G77@idir',
  given_name: 'Test',
  display_name: 'User, Test CITZ:EX',
  family_name: 'User',
  email: 'test.user@gov.bc.ca',
};
