export const throttle = (func: any, limit: number) => {
  let inThrottle: boolean;
  return function (this: any) {
    if (!inThrottle) {
      func.apply(this, [func, limit]);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
