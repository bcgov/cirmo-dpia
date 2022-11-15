interface IHttpRequestOptions {
  endpoint: string;
  method: string;
  headers: Record<string, string>;
  body?: Record<string, any>;
  additionalConfig?: Record<string, any>;
  addLocalAuth?: boolean;
}

export class HttpRequest {
  private static async request<T>(options: IHttpRequestOptions): Promise<T> {
    const requestHeaders: typeof options.headers = {
      'Content-Type': 'application/json',
    };

    if (options.addLocalAuth) {
      const accessToken = localStorage.getItem('access_token');
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

    const response = await fetch(options.endpoint, config);

    if (!response.ok) {
      throw new Error(`Something went wrong : ${response.status}`);
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
    addLocalAuth = false,
  ) {
    return this.request<T>({
      method: 'GET',
      endpoint,
      headers,
      additionalConfig,
      addLocalAuth,
    });
  }

  public static async post<T>(
    endpoint: string,
    body: Record<string, any>,
    headers: Record<string, string> = {},
    additionalConfig: Record<string, any> = {},
    addLocalAuth = false,
  ) {
    return this.request<T>({
      method: 'POST',
      endpoint,
      body,
      headers,
      additionalConfig,
      addLocalAuth,
    });
  }
}
