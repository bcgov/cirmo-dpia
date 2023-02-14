import { IsString } from '@nestjs/class-validator';

export class AdditionalRisk {
  @IsString()
  risk: string;

  @IsString()
  response: string;
}
