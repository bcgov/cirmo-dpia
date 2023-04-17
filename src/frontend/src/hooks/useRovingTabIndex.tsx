import { useCallback, useEffect, useRef } from 'react';

interface UseRovingTabIndexProps {
  currentRef: any;
  disabled: boolean;
}

export const useRovingTabIndex = ({
  currentRef,
  disabled,
}: UseRovingTabIndexProps) => {
  const setFocusOnElement = (el: Element | HTMLElement | null) => {
    if (!el) return;

    (el as HTMLElement).focus();
  };

  const navItems: NodeListOf<HTMLElement> =
    currentRef?.querySelectorAll('[role=navItem]');
  const currentFocusIndex = useRef(0);

  const keydownEventHandler = useCallback(
    (e: any) => {
      const keyboardEvent = e as KeyboardEvent;

      switch (keyboardEvent.key) {
        case 'Tab':
          // Temp removing this - before we get feedback
          // if (currentFocusIndex.current !== 0 && keyboardEvent.shiftKey) {
          //   e.preventDefault();
          // }

          currentFocusIndex.current = 0;

          break;

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
    if (!currentRef || disabled) {
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
  }, [currentRef, disabled, keydownEventHandler, navItems]);
};
