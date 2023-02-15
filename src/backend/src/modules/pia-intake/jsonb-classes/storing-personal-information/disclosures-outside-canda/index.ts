import {
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { DisclosureStorage } from './section-storage';
import { DisclosureContract } from './section-contract';
import { DisclosureControls } from './section-controls';
import { DisclosureTrackAccess } from './section-track-access';
import { DisclosureRisks } from './section-risks';

export class DisclosuresOutsideCanada {
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DisclosureStorage)
  storage: DisclosureStorage;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DisclosureContract)
  contract: DisclosureContract;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DisclosureControls)
  controls: DisclosureControls;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DisclosureTrackAccess)
  trackAccess: DisclosureTrackAccess;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DisclosureRisks)
  risks: DisclosureRisks;
}
