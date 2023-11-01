import { ReactNode } from 'react';
/**
 * Props for the Tooltip component.
 * @property {string} id - value for the checkbox aria-describedby.
 * @property {ReactNode} children - The circle tooltip icon.
 * @property {string} content - The text content of the tooltip.
 * @property {'top' | 'right' | 'bottom' | 'left'} direction - The direction in which the tooltip should appear.
 */
export type TooltipProps = {
  label?: string;
  children?: ReactNode;
  content?: string;
  direction: 'top' | 'right' | 'bottom' | 'left';
  showIcon?: boolean;
};
