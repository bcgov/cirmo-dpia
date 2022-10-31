export class KeycloakUser {
  idir_username?: string;

  email_verified: boolean;

  name: string;

  preferred_username: string;

  display_name: string;

  given_name: string;

  family_name?: string;

  email?: string;

  constructor(name: string) {
    this.name = name;
  }
}
