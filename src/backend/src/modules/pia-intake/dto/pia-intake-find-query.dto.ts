import {
  IsString,
  IsOptional,
  Length,
  IsNumber,
  IsIn,
  IsEnum,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { GovMinistriesEnum } from 'src/common/enums/gov-ministries.enum';
import { SortOrderEnum } from 'src/common/enums/sort-order.enum';
import { PiaIntakeAllowedSortFields } from '../constants/pia-intake-allowed-sort-fields';
import { PiaIntakeEntity } from '../entities/pia-intake.entity';
import { PiaIntakeStatusEnum } from '../enums/pia-intake-status.enum';
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
    type: PiaIntakeStatusEnum,
    example: piaIntakeEntityMock.status,
  })
  @IsString()
  @IsOptional()
  @Length(0, 20)
  @Transform(({ value }) => value.trim())
  readonly filterByStatus?: string = '';

  @ApiProperty({
    required: false,
    type: GovMinistriesEnum,
    example: piaIntakeEntityMock.ministry,
  })
  @IsString()
  @IsOptional()
  @Length(0, 100)
  readonly filterByMinistry?: string = '';

  @ApiProperty({
    required: false,
    type: String,
    example: 'onlyMyPia',
  })
  @IsString()
  @IsOptional()
  @Length(0, 20)
  readonly filterByDrafter?: string = '';

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

  @ApiProperty({
    required: false,
    type: String,
    example: 'updatedAt',
  })
  @IsString()
  @IsIn(PiaIntakeAllowedSortFields)
  @IsOptional()
  readonly sortBy?: keyof PiaIntakeEntity;

  @ApiProperty({
    required: false,
    type: SortOrderEnum,
    example: SortOrderEnum.DESC,
  })
  @Transform(({ value }) => Number(value))
  @IsEnum(SortOrderEnum)
  @IsOptional()
  readonly sortOrder?: SortOrderEnum = SortOrderEnum.DESC;
}
