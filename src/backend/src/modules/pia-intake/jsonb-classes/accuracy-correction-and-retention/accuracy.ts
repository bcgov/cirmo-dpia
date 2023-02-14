import { IsOptional, IsString } from '@nestjs/class-validator';

export class Accuracy {
  @IsString()
  @IsOptional()
  description: string;
}
