import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export default interface CollapsibleProps {
  icon: IconProp;
  children: ReactNode;
  alignment: string;
  isVisible?: boolean;
  fullHeight?: boolean;
}
