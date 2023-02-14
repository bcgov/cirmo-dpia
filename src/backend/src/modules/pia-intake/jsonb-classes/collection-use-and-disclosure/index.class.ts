import {
  IsArray,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { CollectionNotice } from './collection-notice.class';
import { StepWalkthrough } from './steps-walkthrough.class';

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
