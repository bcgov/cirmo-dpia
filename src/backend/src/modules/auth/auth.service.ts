import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as queryString from 'querystring';
import { catchError, map } from 'rxjs/operators';
import { KeycloakToken } from './keycloack-token.model';

@Injectable()
export class AuthService {

    private keycloakLoginUri: string;
    private keycloakResponseType: string;
    private keycloakScope: string;
    private keycloakRedirectUri: string;
    private keycloakClientId: string;
    private keycloakClientSecret: string;
    private keycloakTokenUri: string;
    private keycloakLogoutUri: string;
    
    constructor(  readonly _config: ConfigService, private readonly _http: HttpService) {
        this.keycloakLoginUri = _config.get('KEYCLOAK_LOGIN_URI');
        this.keycloakResponseType = _config.get('KEYCLOAK_RESPONSE_TYPE');
        this.keycloakScope = _config.get('KEYCLOAK_SCOPE');
        this.keycloakRedirectUri = _config.get('KEYCLOAK_REDIRECT_URI');
        this.keycloakClientId = _config.get('KEYCLOAK_CLIENT_ID'); 
        this.keycloakClientSecret = _config.get('KEYCLOAK_CLIENT_SECRET');
        this.keycloakTokenUri = this._config.get('KEYCLOAK_TOKEN_URI');
        this.keycloakLogoutUri = this._config.get('KEYCLOAK_LOGOUT_URI');
    }
    
    getUrlLogin(): any {
        return { url: `${this.keycloakLoginUri}`
        +`?client_id=${this.keycloakClientId}`
            +`&response_type=${this.keycloakResponseType}`
            +`&scope=${this.keycloakScope}`
            +`&redirect_uri=${this.keycloakRedirectUri}`
        }
    }
    
    getAccessToken(code: string) {
        const params = {
            grant_type: 'authorization_code',
            client_id: this.keycloakClientId,
            client_secret: this.keycloakClientSecret,
            code: code,
            redirect_uri: this.keycloakRedirectUri
        }

        return this._http.post (
            this.keycloakTokenUri,
            queryString.stringify(params),
            this.getContentType()
        ).pipe(
            map(res => new KeycloakToken (
                res.data.access_token,
                res.data.refresh_token,
                res.data.expires_in,
                res.data.refresh_expires_in
            )),
            catchError( e => { throw new HttpException( e.response.data, e.response.status) })
        );
    }

    refreshAccessToken(refresh_token: string) {
        const params = {
            grant_type: 'refresh_token',
            client_id: this.keycloakClientId,
            client_secret: this.keycloakClientSecret,
            refresh_token: refresh_token,
            redirect_uri: this.keycloakRedirectUri
        }

        return this._http.post (
            this.keycloakTokenUri,
            queryString.stringify(params),
            this.getContentType()
        ).pipe(
            map(res => new KeycloakToken (
                res.data.access_token,
                res.data.refresh_token,
                res.data.expires_in,
                res.data.refresh_expires_in
            )),
            catchError( e => { throw new HttpException( e.response.data, e.response.status) })
        );
    }

    logout(refresh_token: string) {
        const params = {
            client_id: this.keycloakClientId,
            client_secret: this.keycloakClientSecret,
            refresh_token: refresh_token,
        }

        return this._http.post (
            this.keycloakLogoutUri,
            queryString.stringify(params),
            this.getContentType()
        ).pipe(
            map(res => res.data),
            catchError( e => { throw new HttpException( e.response.data, e.response.status) })
        );
    }

    getContentType() {
        return { headers: { 'Content-Type' : 'application/x-www-form-urlencoded'} }
    }
}