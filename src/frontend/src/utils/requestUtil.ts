export const httpClient = async (
  endpoint: string,
  body: any,
  method = 'POST',
  headers = {},
  customConfig = {},
) => {
  const options = {
    method: method,
    headers: { 'Content-Type': 'application/json', ...headers }, // by default setting the content-type to be json type
    body: body ? JSON.stringify(body) : null,
    ...customConfig,
  };

  const response = await fetch(`/${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
