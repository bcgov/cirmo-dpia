import { IsOptional, IsString } from '@nestjs/class-validator';

export class DisclosureTrackAccess {
  @IsString()
  @IsOptional()
  trackAccessDetails?: string;
}
