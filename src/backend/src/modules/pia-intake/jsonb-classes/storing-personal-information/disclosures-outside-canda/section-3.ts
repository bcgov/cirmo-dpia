import { IsOptional, IsString } from '@nestjs/class-validator';

export class DisclosureSection3 {
  @IsString()
  @IsOptional()
  unauthorizedAccessMeasures?: string;
}
