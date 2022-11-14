export interface KeycloakUser {
  idir_username?: string;

  /**
   * @name id_user_guid
   * @description
   * this is a supplementary field to username, but more anonymous.
   * In case ministry decides to reuse IDIR usernames in the future, it is less likely GUIDs will be repeated.
   * This field can also be used for filtering instead of usernames
   */
  idir_user_guid?: string;

  email_verified: boolean;

  name: string;

  preferred_username: string;

  display_name: string;

  given_name: string;

  family_name?: string;

  email?: string;
}
