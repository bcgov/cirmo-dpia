import {
  IsArray,
  IsObject,
  IsOptional,
  ValidateNested,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { CollectionNotice } from './collection-notice.class';
import { StepWalkthrough } from './steps-walkthrough.class';

export class CollectionUseAndDisclosure {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => StepWalkthrough)
  steps: Array<StepWalkthrough>;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => CollectionNotice)
  collectionNotice: CollectionNotice;
}
