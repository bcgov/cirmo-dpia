export const eventTypes = [
  'keypress',
  'mousemove',
  'mousedown',
  'scroll',
  'touchmove',
  'pointermove',
];

export const addEventListeners = (listener: () => void) => {
  eventTypes.forEach((type) => {
    window.addEventListener(type, listener, false);
  });
};

export const removeEventListeners = (listener: () => void) => {
  if (listener) {
    eventTypes.forEach((type) => {
      window.removeEventListener(type, listener, false);
    });
  }
};
