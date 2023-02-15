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
  piaCollectionUseAndDisclosure: CollectionUseAndDisclosure,
  userType: UserTypesEnum,
) => {
  if (!piaCollectionUseAndDisclosure) return;

  // steps walkthrough validations
  const steps = piaCollectionUseAndDisclosure?.steps;
  if (steps?.length) {
    steps.forEach((step: StepWalkthrough) => {
      validateRoleForStepWalkthrough(step, userType);
    });
  }

  // collection notice validations
  validateRoleForCollectionNotice(
    piaCollectionUseAndDisclosure?.collectionNotice,
    userType,
  );
};
