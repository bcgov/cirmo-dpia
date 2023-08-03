import { UserTypesEnum } from '../enums/users.enum';

export interface IFormField<T> {
  key: keyof T;
  type?: 'text' | 'boolean'; // add ORs for future support if needed
  isRichText?: boolean;
  allowedUserTypesEdit: Array<UserTypesEnum>; // null if no role restrictions apply

  // @isSystemGeneratedField
  // applicable for fields like createdAt, createdBy, or IDIR-derived fields which are added by the server [and FE User cannot change these].
  // This is currently used to filter and validate role changes of the only USER specific fields when the user deletes a particular review - MPO/CPO/ProgramArea
  isSystemGeneratedField?: boolean;
}
