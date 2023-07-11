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

/*
 * @param path - the path to be converted
 * @returns the converted path
 * @example getEditPath('/pia/1/intake/view') => '/pia/1/intake/edit'
 * @description This function is used to convert the path from view to edit
 * it splits up the path into an array and searches for the view keyword
 * and replaces it with edit
 * If there are tabs that do not have an edit version for example the review tab
 * it will replace it with intake
 *
 */
export const getEditPath = (path: string): string => {
  if (!path) return '';
  const pathArray = path.split('/');
  pathArray.forEach((element, index) => {
    if (element === 'view') {
      pathArray[index] = 'edit';
    }
    if (element === 'review') {
      pathArray[index] = 'intake';
    }
  });
  path = pathArray.join('/');
  return path;
};
