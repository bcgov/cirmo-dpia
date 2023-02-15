import { IsOptional, IsString } from '@nestjs/class-validator';

export class DisclosureControls {
  @IsString()
  @IsOptional()
  unauthorizedAccessMeasures?: string;
}
