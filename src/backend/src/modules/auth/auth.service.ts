import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as queryString from 'querystring';
import { catchError, map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { configService } from '../../config/config.service';
import { KeycloakToken } from './keycloack-token.model';
import { KeycloakUser } from './keycloak-user.model';

@Injectable()
export class AuthService {
  private keycloakAuthServerUri: string;

  private keycloakResponseType: string;

  private keycloakScope: string;

  private keycloakRealm: string;

  private keycloakRedirectUri: string;

  private keycloakClientId: string;

  private keycloakClientSecret: string;

  private keycloakTokenUri: string;

  private keycloakUserInfoUri: string;

  private keycloakLogoutUri: string;

  constructor(private readonly httpService: HttpService) {
    this.keycloakAuthServerUri = configService.getValue(
      'KEYCLOAK_AUTH_SERVER_URI',
    );
    this.keycloakResponseType = configService.getValue(
      'KEYCLOAK_RESPONSE_TYPE',
    );
    this.keycloakScope = configService.getValue('KEYCLOAK_SCOPE');
    this.keycloakRealm = configService.getValue('KEYCLOAK_REALM');
    this.keycloakRedirectUri = configService.getValue('KEYCLOAK_REDIRECT_URI');
    this.keycloakClientId = configService.getValue('KEYCLOAK_CLIENT_ID');
    this.keycloakClientSecret = configService.getValue(
      'KEYCLOAK_CLIENT_SECRET',
    );
    this.keycloakUserInfoUri = configService.getValue('KEYCLOAK_USER_INFO_URI');
    this.keycloakTokenUri = configService.getValue('KEYCLOAK_TOKEN_URI');
    this.keycloakLogoutUri = configService.getValue('KEYCLOAK_LOGOUT_URI');
  }

  getUrlLogin(): any {
    return {
      url:
        `${this.keycloakAuthServerUri}` +
        `/realms/${this.keycloakRealm}/protocol/openid-connect/auth` +
        `?client_id=${this.keycloakClientId}` +
        `&response_type=${this.keycloakResponseType}` +
        `&scope=${this.keycloakScope}` +
        `&redirect_uri=${this.keycloakRedirectUri}`,
    };
  }

  async getAccessToken(code: string): Promise<KeycloakToken> {
    const params = {
      grant_type: 'authorization_code',
      client_id: this.keycloakClientId,
      client_secret: this.keycloakClientSecret,
      code: code,
      redirect_uri: this.keycloakRedirectUri,
    };

    const data = await firstValueFrom(
      this.httpService
        .post(
          this.keycloakTokenUri,
          queryString.stringify(params),
          this.getContentType(),
        )
        .pipe(
          map(
            (res: any) =>
              new KeycloakToken(
                res.data.access_token,
                res.data.refresh_token,
                res.data.expires_in,
                res.data.refresh_expires_in,
              ),
          ),
          catchError((e) => {
            throw new HttpException(e.response?.data, e.response?.status);
          }),
        ),
    );
    return data;
  }

  async getUserInfo(accessToken: string): Promise<KeycloakUser> {
    const params = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const data = await firstValueFrom(
      this.httpService.get(this.keycloakUserInfoUri, params).pipe(
        map((res: any) => res.data as KeycloakUser),
        catchError((e) => {
          throw new HttpException(e.response?.data, e.response?.status);
        }),
      ),
    );

    return data;
  }

  async refreshAccessToken(refresh_token: string): Promise<KeycloakToken> {
    const params = {
      grant_type: 'refresh_token',
      client_id: this.keycloakClientId,
      client_secret: this.keycloakClientSecret,
      refresh_token: refresh_token,
      redirect_uri: this.keycloakRedirectUri,
    };

    const data = await firstValueFrom(
      this.httpService
        .post(
          this.keycloakTokenUri,
          queryString.stringify(params),
          this.getContentType(),
        )
        .pipe(
          map(
            (res: any) =>
              new KeycloakToken(
                res.data.access_token,
                res.data.refresh_token,
                res.data.expires_in,
                res.data.refresh_expires_in,
              ),
          ),
          catchError((e) => {
            console.error(e.response?.data, e.response?.status);
            throw new HttpException(e.response?.data, e.response?.status);
          }),
        ),
    );
    return data;
  }

  async logout(refresh_token: string) {
    const params = {
      client_id: this.keycloakClientId,
      client_secret: this.keycloakClientSecret,
      refresh_token: refresh_token,
    };

    const data = await firstValueFrom(
      this.httpService
        .post(
          this.keycloakLogoutUri,
          queryString.stringify(params),
          this.getContentType(),
        )
        .pipe(
          map((res: any) => res.data),
          catchError((e) => {
            console.error(e.response?.data, e.response?.status);
            throw new HttpException(e.response?.data, e.response?.status);
          }),
        ),
    );
    return data;
  }

  getContentType() {
    return { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
  }
}
