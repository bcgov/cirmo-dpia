import {
  IsArray,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import {
  CollectionNotice,
  validateRoleForCollectionNotice,
} from './collection-notice';
import {
  StepWalkthrough,
  validateRoleForStepWalkthrough,
} from './steps-walkthrough';

export class CollectionUseAndDisclosure {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StepWalkthrough)
  steps: Array<StepWalkthrough>;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CollectionNotice)
  collectionNotice: CollectionNotice;
}

/**
 * @method validateRoleForCollectionUseAndDisclosure
 *
 * @description
 * This method validates role access to collectionUseAndDisclosure
 */
export const validateRoleForCollectionUseAndDisclosure = (
  updatedValue: CollectionUseAndDisclosure,
  storedValue: CollectionUseAndDisclosure,
  userType: UserTypesEnum,
) => {
  if (!updatedValue) return;

  // steps walkthrough validations
  const updatedSteps = updatedValue?.steps;
  const storedSteps = storedValue?.steps;
  if (updatedSteps?.length) {
    updatedSteps.forEach((step: StepWalkthrough, i: number) => {
      validateRoleForStepWalkthrough(step, storedSteps?.[i], userType);
    });
  }

  // collection notice validations
  validateRoleForCollectionNotice(
    updatedValue?.collectionNotice,
    storedValue?.collectionNotice,
    userType,
  );
};
