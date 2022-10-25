import { KeycloakCredentials } from 'nest-keycloak-connect';

/**
 * Keycloak Connect options.
 */
export interface IKeycloakConnectOptions {
  /**
   * Realm ID.
   */
  realm: string;
  /**
   * Client/Application ID.
   */
  resource: string;
  /**
   * Client/Application secret.
   */
  credentials: KeycloakCredentials;
  /**
   * Authentication server URL as defined in keycloak.json
   */
  authServerUrl: string;
  /**
   * Client secret credientials.
   */
  secret?: string;
  /**
   * Confidential port.
   */
  'confidential-port'?: string | number;
  /**
   * Require SSL.
   */
  'ssl-required'?: string;
}
