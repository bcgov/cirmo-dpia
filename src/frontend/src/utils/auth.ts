import { API_ROUTES } from '../constant/apiRoutes';
import { AppStorage } from './storage';
// https://github.com/microsoft/TypeScript/issues/48949
// workaround
const win: Window = window;

export enum TokenStorageKeys {
  ACCESS_TOKEN = 'accessToken',
  ACCESS_TOKEN_EXPIRY = 'accessTokenExpiry',
  REFRESH_TOKEN = 'refreshToken',
  REFRESH_TOKEN_EXPIRY = 'refreshTokenExpiry',
}

export const isAuthenticated = () => {
  return !!AppStorage.getItem(TokenStorageKeys.ACCESS_TOKEN);
};

export const storeAuthTokens = (data: any) => {
  AppStorage.setItem(TokenStorageKeys.ACCESS_TOKEN, data.access_token);
  AppStorage.setItem(
    TokenStorageKeys.ACCESS_TOKEN_EXPIRY,
    (Date.now() + data.expires_in * 1000).toString(),
  );
  AppStorage.setItem(TokenStorageKeys.REFRESH_TOKEN, data.refresh_token);
  AppStorage.setItem(
    TokenStorageKeys.REFRESH_TOKEN_EXPIRY,
    (Date.now() + data.refresh_expires_in * 1000).toString(),
  );
};

export const clearAuthTokens = () => {
  Object.keys(TokenStorageKeys).forEach((key) => AppStorage.removeItem(key));
};

export const checkRefreshToken = async () => {
  const refreshToken = win.localStorage.getItem('refresh_token');
  const refreshExpires = win.localStorage.getItem('refresh_expires');
  const now = Date.now() / 1000;

  if (refreshToken && refreshExpires) {
    if (now > parseFloat(refreshExpires) - 180) {
      clearAuthTokens();
      try {
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            token: refreshToken,
          }),
        });
        if (response.status >= 400) {
          const error = await response.json();
          throw error.detail;
        }
        const data = await response.json();
        storeAuthTokens(data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};

export const checkAccessToken = async () => {
  const accessToken = win.localStorage.getItem('access_token');
  const refreshToken = win.localStorage.getItem('refresh_token');
  const accessExpires = win.localStorage.getItem('access_expires');
  const now = Date.now() / 1000;

  if (accessToken && accessExpires) {
    if (now > parseFloat(accessExpires) - 180) {
      clearAuthTokens();
      try {
        const response = await fetch(`/${API_ROUTES.KEYCLOAK_REFRESH_TOKEN}`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            token: refreshToken,
          }),
        });
        if (response.status >= 400) {
          const error = await response.json();
          throw error.detail;
        }
        const data = await response.json();
        storeAuthTokens(data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};

export const periodicRefreshTokenCheck = (seconds = 60) => {
  const interval = setInterval(() => {
    if (isAuthenticated()) checkRefreshToken();
  }, seconds * 1000);
  return () => clearInterval(interval);
};

export const getTokens = async (code: string) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // by default setting the content-type to be json type
    body: JSON.stringify({ code: code }),
  };
  const response = await fetch(`/${API_ROUTES.KEYCLOAK_CALLBACK}`, options);
  if (response.status >= 400) {
    const error = await response.json();
    throw error.detail;
  }
  const data = await response.json();
  storeAuthTokens(data);
};

const checkStatus = async (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = await response.json();
    throw error.detail;
  }
};

export const authorizedFetch = async (
  url: string,
  headers: any,
  options: any,
) => {
  if (isAuthenticated()) {
    await checkAccessToken();
    const token = localStorage.getItem('access_token');
    headers.Authorization = 'Bearer ' + token;
  }

  let response = await fetch(url, {
    headers,
    ...options,
  });

  response = await checkStatus(response);
  return response.json();
};
