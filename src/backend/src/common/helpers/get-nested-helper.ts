/**
 *
 * getNested(['a'], {a:1}) ==> 1
 * getNested(['a'], {b:{c:2}}) ==> null
 */

export const getNested = (path, obj = {}) => {
  if (!path) return obj;

  const pathSplit = path.split('.');

  return pathSplit.reduce(
    (acc, curr) => (acc && acc[curr] ? acc[curr] : null),
    obj,
  );
};
