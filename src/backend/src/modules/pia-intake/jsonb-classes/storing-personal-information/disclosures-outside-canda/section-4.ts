import { IsOptional, IsString } from '@nestjs/class-validator';

export class DisclosureSection4 {
  @IsString()
  @IsOptional()
  trackAccessDetails?: string;
}
