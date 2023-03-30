import { useCallback, useEffect, useRef } from 'react';

interface UseRovingTabIndexProps {
  ref: any;
  disabled: boolean;
}

export const useRovingTabIndex = ({
  ref,
  disabled,
}: UseRovingTabIndexProps) => {
  const setFocusOnElement = (el: Element | HTMLElement | null) => {
    if (!el) return;

    (el as HTMLElement).focus();
  };

  const current = ref?.current as HTMLElement;
  const navItems = current?.querySelectorAll('[role=navItem]');
  const currentFocusIndex = useRef(0);

  const keydownEventHandler = useCallback(
    (e: any) => {
      const keyboardEvent = e as KeyboardEvent;

      switch (keyboardEvent.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          currentFocusIndex.current--;

          if (currentFocusIndex.current < 0) {
            currentFocusIndex.current = navItems.length - 1;
          }

          break;

        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          currentFocusIndex.current++;

          if (currentFocusIndex.current > navItems.length - 1) {
            currentFocusIndex.current = 0;
          }
      }

      setFocusOnElement(navItems[currentFocusIndex.current]);
    },
    [navItems],
  );

  useEffect(() => {
    // if disabled, do not add event handlers
    if (!current || disabled) {
      return;
    }

    if (navItems.length === 0) return;

    navItems.forEach((navItem) =>
      navItem.addEventListener('keydown', keydownEventHandler),
    );

    return () => {
      navItems.forEach((navItem) =>
        navItem.removeEventListener('keydown', keydownEventHandler),
      );
    };
  }, [current, disabled, keydownEventHandler, navItems]);
};
