import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ReactNode } from 'react';

export default interface CollapsibleProps {
  icon: IconProp;
  children: ReactNode;
  alignment: string;
  isRightOpen?: boolean;
  isLeftOpen?: boolean;
}
