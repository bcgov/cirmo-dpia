import { ChangeEventHandler } from 'react';
import { YesNoInput } from '../../../types/enums/yes-no.enum';

export interface IRadio {
  index: number;
  value: string | YesNoInput;
  groupName: string;
  isDefault?: boolean;
  changeHandler: any;
}
