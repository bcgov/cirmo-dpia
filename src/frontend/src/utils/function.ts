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

// returns true for "0" and false for "a"
export const isNumberString = (numberString: string | number) =>
  !isNaN(Number(numberString));
