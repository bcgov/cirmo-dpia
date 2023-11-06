import { ReactNode } from 'react';
/**
 * Props for the Tooltip component.
 * @property {string} label - The tooltip label.
 * @property {ReactNode} children - The circle tooltip icon.
 * @property {string} content - The text content of the tooltip.
 * @property {'top' | 'right' | 'bottom' | 'left'} direction - The direction in which the tooltip should appear.
 */

type TooltipDirection = 'right' | 'bottom' | 'top' | 'left';

export type TooltipProps = {
  label?: string;
  children?: ReactNode;
  content?: ReactNode;
  direction: TooltipDirection;
  showIcon?: boolean;
};
