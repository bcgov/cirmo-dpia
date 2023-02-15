import { IsOptional, IsString } from '@nestjs/class-validator';

export class AdditionalRisk {
  @IsString()
  risk: string;

  @IsString()
  @IsOptional()
  response: string;
}
