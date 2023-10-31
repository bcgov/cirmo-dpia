import { ReactNode } from 'react';
export type TooltipProps = {
  id?: string;
  children: ReactNode;
  content?: string;
  direction: 'top' | 'right' | 'bottom' | 'left';
  className: string;
};
