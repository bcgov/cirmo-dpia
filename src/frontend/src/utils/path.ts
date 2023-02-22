// converts ('/pia/:id/intake', {id: 2}) to '/pia/2/intake'
export const buildDynamicPath = (
  route: string,
  data: Record<string, string | number | undefined>,
): string => {
  if (!data || !route) return '';

  return Object.keys(data).reduce((acc, key) => {
    const value = data[key];
    if (!value) return acc;

    return acc?.replace(`:${key}`, value.toString());
  }, route);
};
