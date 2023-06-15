import { IsOptional, IsString } from '@nestjs/class-validator';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { IFormField } from 'src/common/interfaces/form-field.interface';
import { validateRoleForFormField } from 'src/common/validators/form-field-role.validator';

export class CollectionNotice {
  @IsString()
  @IsOptional()
  drafterInput?: string;

  @IsString()
  @IsOptional()
  mpoInput?: string;
}

export const CollectionNoticeMetadata: Array<IFormField<CollectionNotice>> = [
  {
    key: 'drafterInput',
    type: 'text',
    isRichText: true,
    allowedUserTypesEdit: null, // any user can edit this field
  },
  {
    key: 'mpoInput',
    type: 'text',
    isRichText: true,
    allowedUserTypesEdit: [UserTypesEnum.MPO], // only MPO users can edit this field
  },
];

/**
 * @method validateRoleForCollectionNotice
 *
 * @description
 * This method validates role access to CollectionNotice values
 */
export const validateRoleForCollectionNotice = (
  updatedValue: CollectionNotice,
  storedValue: CollectionNotice,
  userType: UserTypesEnum[],
) => {
  if (!updatedValue) return;

  const keys = Object.keys(updatedValue) as Array<keyof CollectionNotice>;

  keys.forEach((key) => {
    const updatedKeyValue = updatedValue?.[key];
    const storedKeyValue = storedValue?.[key];
    const metadata = CollectionNoticeMetadata.find((m) => m.key === key);

    validateRoleForFormField(
      metadata,
      updatedKeyValue,
      storedKeyValue,
      userType,
      `collectionNotice.${key}`,
    );
  });
};
