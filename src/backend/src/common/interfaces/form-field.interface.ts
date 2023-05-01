import { UserTypesEnum } from '../enums/users.enum';

export interface IFormField<T> {
  key: keyof T;
  type?: 'text' | 'boolean'; // add ORs for future support if needed
  isRichText?: boolean;
  allowedUserTypesEdit: Array<UserTypesEnum>; // null if no role restrictions apply
}
