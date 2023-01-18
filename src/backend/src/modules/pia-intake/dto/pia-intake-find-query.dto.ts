import { IsString, IsOptional, Length } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { piaIntakeEntityMock } from './create-pia-intake.dto';

export class PiaIntakeFindQuery {
  @ApiProperty({
    required: false,
    type: String,
    example: piaIntakeEntityMock.title,
  })
  @IsString()
  @IsOptional()
  @Length(0, 100)
  @Transform(({ value }) => (value ? value.trim() : ''))
  readonly searchText?: string = '';
}
