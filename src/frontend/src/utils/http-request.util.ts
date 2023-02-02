import { TokenStorageKeys } from './auth';
import { AppStorage } from './storage';

interface IHttpRequestOptions {
  endpoint: string;
  method: string;
  headers: Record<string, string>;
  body?: Record<string, any>;
  additionalConfig?: Record<string, any>;
  addLocalAuth?: boolean;
  query?: Record<string, any>;
}

// Helper method to convert { sortBy: drafterName } to sortBy=drafterName
const queryString = (query: Record<string, any> = {}) => {
  return Object.keys(query).reduce((acc, key) => {
    return acc + encodeURI(key) + '=' + encodeURI(query[key]) + '&';
  }, '?');
};

export class HttpRequest {
  private static async request<T>(options: IHttpRequestOptions): Promise<T> {
    const requestHeaders: typeof options.headers = {
      'Content-Type': 'application/json',
    };

    if (options.addLocalAuth) {
      const accessToken = AppStorage.getItem(TokenStorageKeys.ACCESS_TOKEN);
      if (!accessToken) {
        console.error('Auth Error: Missing Access Token');
        throw new Error('Authentication Error: Something went wrong.');
      }

      requestHeaders.Authorization = `Bearer ${accessToken}`;
    }

    const config = {
      method: options.method,
      headers: {
        ...requestHeaders,
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : null,
      ...options?.additionalConfig,
    };

    let url = options.endpoint;

    if (options.query) {
      url = url + queryString(options.query);
    }
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error('Something went wrong', {
        cause: {
          status: response.status,
          data: response.status !== 204 ? await response.json() : {},
        } as any,
      });
    }

    if (config.headers?.['Content-Type'] === 'application/json') {
      if (response.status !== 204) {
        return response.json();
      }
    }

    return response as unknown as T;
  }

  public static async get<T>(
    endpoint: string,
    headers: Record<string, string> = {},
    additionalConfig: Record<string, any> = {},
    addLocalAuth = true,
    query: Record<string, any> = {},
  ) {
    return this.request<T>({
      method: 'GET',
      endpoint,
      headers,
      additionalConfig,
      addLocalAuth,
      query,
    });
  }

  public static async post<T>(
    endpoint: string,
    body: Record<string, any>,
    headers: Record<string, string> = {},
    additionalConfig: Record<string, any> = {},
    addLocalAuth = true,
    query: Record<string, any> = {},
  ) {
    return this.request<T>({
      method: 'POST',
      endpoint,
      body,
      headers,
      additionalConfig,
      addLocalAuth,
      query,
    });
  }

  public static async patch<T>(
    endpoint: string,
    body: Record<string, any>,
    headers: Record<string, string> = {},
    additionalConfig: Record<string, any> = {},
    addLocalAuth = true,
  ) {
    return this.request<T>({
      method: 'PATCH',
      endpoint,
      body,
      headers,
      additionalConfig,
      addLocalAuth,
    });
  }
}
