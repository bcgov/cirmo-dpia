interface IHttpRequestOptions {
  endpoint: string;
  method: string;
  headers: Record<string, string>;
  body?: Record<string, any>;
  additionalConfig?: Record<string, any>;
}

export class HttpRequest {
  private static async request<T>(options: IHttpRequestOptions): Promise<T> {
    const config = {
      method: options.method,
      headers: { 'Content-Type': 'application/json', ...options.headers }, // by default setting the content-type to be json type
      body: options.body ? JSON.stringify(options.body) : null,
      ...options?.additionalConfig,
    };

    const response = await fetch(options.endpoint, config);

    if (!response.ok) {
      throw new Error(`Something went wrong : ${response.status}`);
    }

    if (config.headers?.['Content-Type'] === 'application/json') {
      return response.json();
    }

    return response as unknown as T;
  }

  public static async get<T>(
    endpoint: string,
    headers: Record<string, string> = {},
    additionalConfig: Record<string, any> = {},
  ) {
    return this.request<T>({
      method: 'GET',
      endpoint,
      headers,
      additionalConfig,
    });
  }

  public static async post<T>(
    endpoint: string,
    body: Record<string, any>,
    headers: Record<string, string> = {},
    additionalConfig: Record<string, any> = {},
  ) {
    return this.request<T>({
      method: 'POST',
      endpoint,
      body,
      headers,
      additionalConfig,
    });
  }
}
