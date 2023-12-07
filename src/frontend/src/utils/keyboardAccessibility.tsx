import { useEffect, useCallback, ReactNode } from 'react';

interface KeyboardAccessibilityProps {
  // Prop to accept React nodes as children
  children: ReactNode;
}

const KeyboardAccessibility = ({ children }: KeyboardAccessibilityProps) => {
  // Custom hook to handle the 'Enter' key as a click event
  const handleEnterAsClick = useCallback((event: KeyboardEvent) => {
    // Trigger only if the 'Enter' key is pressed
    if (event.key === 'Enter') {
      // Get the currently active element in the DOM
      const activeElement = document.activeElement as HTMLElement;

      // Determine if the active element has its own keydown event handler
      const hasOwnHandler = activeElement
        ?.getAttribute('onKeyDown')
        ?.includes('handleKeyDown');

      // If the active element exists, can be clicked, and doesn't have its own handler
      if (
        activeElement &&
        typeof activeElement.click === 'function' &&
        !hasOwnHandler
      ) {
        // Prevent the default action to handle it manually
        event.preventDefault();
        // Simulate a click event on the active element
        activeElement.click();
      }
    }
  }, []);

  // Effect hook to add and remove the custom keydown event listener
  useEffect(() => {
    // Add the event listener when the component mounts
    document.addEventListener('keydown', handleEnterAsClick);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleEnterAsClick);
    };
  }, [handleEnterAsClick]);

  // Render the children elements passed to the component
  return <>{children}</>;
};

// Export the component for use in other parts of the application
export default KeyboardAccessibility;
