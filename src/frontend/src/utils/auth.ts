import { API_ROUTES } from '../constant/apiRoutes';
import { IKeycloakToken } from '../types/interfaces/keyCloakToken.interface';
import { HttpRequest } from './http-request.util';
import { AppStorage } from './storage';

export enum TokenStorageKeys {
  ACCESS_TOKEN = 'accessToken',
  ACCESS_TOKEN_EXPIRY = 'accessTokenExpiry',
  REFRESH_TOKEN = 'refreshToken',
  REFRESH_TOKEN_EXPIRY = 'refreshTokenExpiry',
  TOKENS_LAST_REFRESHED_AT = 'tokensLastRefreshedAt',
}

export enum ConfigStorageKeys {
  USERNAME = 'username',
  CONFIG = 'config',
  ROLES = 'roles',
}

export const isAuthenticated = () => {
  const now = +new Date();

  const accessToken = AppStorage.getItem(TokenStorageKeys.ACCESS_TOKEN);
  const accessTokenExpiry = AppStorage.getItem(
    TokenStorageKeys.ACCESS_TOKEN_EXPIRY,
  );

  if (accessToken && accessTokenExpiry && +accessTokenExpiry > now) {
    return true;
  }

  return false;
};

export const storeAuthTokens = (data: IKeycloakToken) => {
  const now = Date.now();

  AppStorage.setItem(TokenStorageKeys.ACCESS_TOKEN, data.access_token);
  AppStorage.setItem(
    TokenStorageKeys.ACCESS_TOKEN_EXPIRY,
    now + +data.expires_in * 1000,
  );
  AppStorage.setItem(TokenStorageKeys.REFRESH_TOKEN, data.refresh_token);
  AppStorage.setItem(
    TokenStorageKeys.REFRESH_TOKEN_EXPIRY,
    now + +data.refresh_expires_in * 1000,
  );
  AppStorage.setItem(TokenStorageKeys.TOKENS_LAST_REFRESHED_AT, +now);
};

export const clearAuthTokens = () => {
  Object.values(TokenStorageKeys).forEach((key) => AppStorage.removeItem(key));
};

export const clearConfig = () => {
  Object.values(ConfigStorageKeys).forEach((key) => AppStorage.removeItem(key));
};

export const clearStorage = () => {
  AppStorage.clear();
};

export const getAuthTokens = () => {
  return {
    access_token: AppStorage.getItem(TokenStorageKeys.ACCESS_TOKEN),
    refresh_token: AppStorage.getItem(TokenStorageKeys.REFRESH_TOKEN),
  };
};

export const authLogoutHandler = async (
  navigateCallback: (pathUrl: string) => void,
) => {
  // in case user is already logged out, skip logout call as this will result in an error if logout is attempted twice
  if (isAuthenticated()) {
    await HttpRequest.post(API_ROUTES.KEYCLOAK_LOGOUT, getAuthTokens());
  }

  clearStorage();
  navigateCallback('/');
};

export const refreshAuthTokens = async () => {
  const now = +new Date();

  const refreshToken = AppStorage.getItem(TokenStorageKeys.REFRESH_TOKEN);
  const refreshTokenExpiry = AppStorage.getItem(
    TokenStorageKeys.REFRESH_TOKEN_EXPIRY,
  );

  if (refreshToken && refreshTokenExpiry && +refreshTokenExpiry > now) {
    try {
      // request to fetch the refreshed tokens
      const tokenDetails = await HttpRequest.post<IKeycloakToken>(
        API_ROUTES.KEYCLOAK_REFRESH_TOKEN,
        getAuthTokens(),
        {},
        {},
        false,
      );

      // clear existing tokens
      clearAuthTokens();

      // store new token
      storeAuthTokens(tokenDetails);

      // return success
      return true;
    } catch (e) {
      // failed to refresh tokens [return false]
      console.error(e);
    }
  }

  // return failure [caller of the method may need to redirect user to the login page]
  return false;
};
