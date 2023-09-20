import { API_ROUTES } from '../constant/apiRoutes';
import { IKeycloakToken } from '../types/interfaces/keyCloakToken.interface';
import { HttpRequest } from './http-request.util';
import { AppStorage } from './storage';

export enum TokenStorageKeys {
  ACCESS_TOKEN = 'accessToken',
  ACCESS_TOKEN_EXPIRY = 'accessTokenExpiry',
  REFRESH_TOKEN = 'refreshToken',
  ID_TOKEN = 'idToken',
  REFRESH_TOKEN_EXPIRY = 'refreshTokenExpiry',
  TOKENS_LAST_REFRESHED_AT = 'tokensLastRefreshedAt',
  LAST_ACTIVITY_AT = 'lastActivityAt',
  IS_AUTO_LOGOUT_WARNING_POPUP_OPEN = 'isAutoLogoutWarningPopupOpen',
  POST_LOGIN_REDIRECT_URL = 'postLoginRedirectUrl',
  FRESH_LOGIN_STATE = 'freshLoginState',
}

export enum ConfigStorageKeys {
  USERNAME = 'username',
  CONFIG = 'config',
  ROLES = 'roles',
  GUID = 'guid',
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

  // Set post login redirect url
  const freshLoginState = AppStorage.getItem(
    TokenStorageKeys.FRESH_LOGIN_STATE,
  );
  if (
    !freshLoginState &&
    window.location.pathname !== '' &&
    window.location.pathname !== '/' &&
    window.location.pathname !== '/not-authorized' &&
    window.location.pathname !== 'pia/list' &&
    !window.location.pathname.includes('pia-list?session_state')
  )
    AppStorage.setItem(
      TokenStorageKeys.POST_LOGIN_REDIRECT_URL,
      window.location.href,
    );

  return false;
};

export const storeAuthTokens = (data: IKeycloakToken) => {
  const now = Date.now();

  AppStorage.setItem(TokenStorageKeys.ACCESS_TOKEN, data.access_token);
  AppStorage.setItem(
    TokenStorageKeys.ACCESS_TOKEN_EXPIRY,
    now + +data.expires_in * 1000,
  );
  AppStorage.setItem(TokenStorageKeys.ID_TOKEN, data.id_token);
  AppStorage.setItem(TokenStorageKeys.REFRESH_TOKEN, data.refresh_token);
  AppStorage.setItem(
    TokenStorageKeys.REFRESH_TOKEN_EXPIRY,
    now + +data.refresh_expires_in * 1000,
  );
  AppStorage.setItem(TokenStorageKeys.TOKENS_LAST_REFRESHED_AT, +now);
  AppStorage.setItem(TokenStorageKeys.LAST_ACTIVITY_AT, +now);
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
    id_token: AppStorage.getItem(TokenStorageKeys.ID_TOKEN),
  };
};

export const login = () => {
  AppStorage.setItem(TokenStorageKeys.FRESH_LOGIN_STATE, true);
  window.location.href = API_ROUTES.KEYCLOAK_LOGIN;
};

export const logMeOut = async (unauthorized = false, cb?: () => void) => {
  const unauthRedirectUrl = `${window.location.origin}/not-authorized`;
  const loginRedirectUrl = `${window.location.origin}/`;

  // Set post login redirect url
  let postLoginRedirectUrl;
  if (
    window.location.pathname !== '/' &&
    window.location.pathname !== '/not-authorized' &&
    window.location.pathname !== 'pia/list'
  )
    postLoginRedirectUrl = window.location.href;

  const redirectUrl = unauthorized ? unauthRedirectUrl : loginRedirectUrl;

  interface LogoutUrlResponse {
    siteMinderUrl: string;
    keycloakUrl: string;
  }

  const logoutUrlResponse: LogoutUrlResponse = await HttpRequest.get(
    API_ROUTES.KEYCLOAK_LOGOUT,
    {},
    {},
    true,
    {
      id_token: AppStorage.getItem(TokenStorageKeys.ID_TOKEN),
      redirect_url: redirectUrl,
    },
  );

  // in case user is already logged out, skip logout call as this will result in an error if logout is attempted twice
  if (isAuthenticated())
    window.location.href = `${logoutUrlResponse.siteMinderUrl}${logoutUrlResponse.keycloakUrl}`;

  clearStorage();

  AppStorage.setItem(
    TokenStorageKeys.POST_LOGIN_REDIRECT_URL,
    postLoginRedirectUrl,
  );

  cb?.();
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

      // overwrite auth tokens
      // Note: Not deleting and storing: but overwriting the existing tokens
      // Reason: Deleting the tokens first triggers a storage event on other tabs, which logs the app out as the tokens are missing for the interim.
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
