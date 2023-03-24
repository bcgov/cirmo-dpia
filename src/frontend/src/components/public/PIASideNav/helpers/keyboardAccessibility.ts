const createAccessibleNav = () => {
  const menuItems = [...document.querySelectorAll('[role=menuitem]')];

  const firstItem = menuItems[0];
  const lastItem = menuItems[menuItems.length - 1];

  menuItems.forEach((item) => {
    item.addEventListener('keydown', (e) => {
      const keyboardEvent = <KeyboardEvent>e;
      switch (keyboardEvent.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          if (item === firstItem) (lastItem as HTMLElement)?.focus();
          else {
            const nextItem = menuItems.indexOf(item) - 1;
            (menuItems[nextItem] as HTMLElement)?.focus();
          }
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          if (item === lastItem) (firstItem as HTMLElement)?.focus();
          else {
            const nextItem = menuItems.indexOf(item) + 1;
            (menuItems[nextItem] as HTMLElement)?.focus();
          }
          break;

        default:
          break;
      }
    });
  });
};

createAccessibleNav();

export {};
