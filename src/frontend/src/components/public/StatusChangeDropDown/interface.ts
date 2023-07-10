import { IPiaForm } from '../../../types/interfaces/pia-form.interface';

export interface IStatusChangeDropDownProps {
  pia: IPiaForm;
  changeStatusFn: (modal: object, status: string) => void;
  mode?: 'view' | 'edit';
}

/* I modal callback interface is a function
   that will be triggered with the right modal
   information and the status that was selected
   */
export interface ImodalCB {
  (modal: object, status: string): void;
}
