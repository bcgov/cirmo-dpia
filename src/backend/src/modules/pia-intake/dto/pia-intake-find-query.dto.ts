import {
  IsString,
  IsOptional,
  Length,
  IsNumber,
} from '@nestjs/class-validator';
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
  @Transform(({ value }) => value.trim())
  readonly searchText?: string = '';

  @ApiProperty({
    required: false,
    type: String,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Math.floor(Math.max(Number(value), 1)))
  readonly page?: number = 1;

  @ApiProperty({
    required: false,
    type: String,
    example: 12,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Math.floor(Math.max(Number(value), 1)))
  readonly pageSize?: number = 12;
}
