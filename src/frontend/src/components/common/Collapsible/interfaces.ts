import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export default interface CollapsibleProps {
  icon: IconProp;
  children: ReactNode;
  alignment: string;
  isVisible?: boolean;
  setIsVisible?: Dispatch<SetStateAction<boolean>>;
  onOpenHandler?: () => void;
  fullHeight?: boolean;
  bringToFocus?: number; // change this number to retrigger useEffect, bringing the collapsible bar to focus
}
