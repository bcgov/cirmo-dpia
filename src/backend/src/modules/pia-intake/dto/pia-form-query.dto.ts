import { IsString, IsOptional, Length } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { piaIntakeEntityMock } from './create-pia-intake.dto';

export class PiaFormQuery {
  @ApiProperty({
    required: false,
    type: String,
    example: piaIntakeEntityMock.title,
  })
  @IsString()
  @IsOptional()
  @Length(0, 100)
  readonly title: string;

  @ApiProperty({
    required: false,
    type: String,
    example: piaIntakeEntityMock.drafterName,
  })
  @IsString()
  @IsOptional()
  @Length(0, 25)
  readonly drafter: string;
}
