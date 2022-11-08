import { API_ROUTES } from '../constant/apiRoutes';
// https://github.com/microsoft/TypeScript/issues/48949
// workaround
const win: Window = window;
export const isAuthenticated = () => {
  return (
    win.localStorage.getItem('access_token') !== null &&
    win.localStorage.getItem('access_token') !== undefined
  );
};

export const storeTokens = (data: any) => {
  win.localStorage.setItem('access_token', data.access_token);
  win.localStorage.setItem('expires_in', Date.now() / 1000 + data.expires_in);
  win.localStorage.setItem('refresh_token', data.refresh_token);
  win.localStorage.setItem(
    'refresh_expires_in',
    Date.now() / 1000 + data.refresh_expires_in,
  );
};

export const clearTokens = () => {
  win.localStorage.clear();
};

export const checkRefreshToken = async () => {
  const refreshToken = win.localStorage.getItem('refresh_token');
  const refreshExpires = win.localStorage.getItem('refresh_expires');
  const now = Date.now() / 1000;

  if (refreshToken && refreshExpires) {
    if (now > parseFloat(refreshExpires) - 180) {
      clearTokens();
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
        storeTokens(data);
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
      clearTokens();
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
        storeTokens(data);
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
  storeTokens(data);
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
