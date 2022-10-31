import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from '@nestjs/class-validator';
import { GovMinistriesEnum } from '../../../common/enums/gov-ministries.enum';
import { PiaTypesEnum } from '../../../common/enums/pia-types.enum';

export class PpqPostDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    type: String,
    required: true,
    example: 'Marvin McKinney',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  @ApiProperty({
    type: String,
    required: true,
    example: 'name@bc.gov.in',
  })
  email: string;

  @IsEnum(GovMinistriesEnum)
  @IsNotEmpty()
  @ApiProperty({
    enum: GovMinistriesEnum,
    required: true,
    example: GovMinistriesEnum.AGRICULTURE_AND_FOOD,
  })
  ministry: GovMinistriesEnum;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({ type: String, required: true })
  branch: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    type: String,
    required: true,
    example: 'Add Figma to my BC Gov Project',
  })
  initiativeName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  initiativeDescription: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  dataElements: string;

  @IsEnum(PiaTypesEnum)
  @IsOptional()
  @ApiProperty({
    enum: PiaTypesEnum,
    required: false,
    example: PiaTypesEnum.CORPORATE_CHECKLIST,
  })
  piaType: PiaTypesEnum;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false,
    example: false,
  })
  containsPersonalInformation: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false,
    example: false,
  })
  hasSensitivePersonalInformation: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false,
    example: false,
  })
  hasSharingOfPersonalInformation: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false,
    example: false,
  })
  hasProgramAgreement: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false,
    example: false,
  })
  hasOthersAccessToPersonalInformation: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false,
    example: false,
  })
  hasCloudTechnology: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false,
    example: false,
  })
  hasPotentialPublicInterest: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false,
    example: false,
  })
  hasDisclosureOutsideOfCanada: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false,
    example: false,
  })
  hasBcServicesCardOnboarding: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false,
    example: false,
  })
  hasAiOrMl: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false,
    example: false,
  })
  hasPartnershipNonMinistry: boolean;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({ type: Date, required: false })
  proposedStartDate?: Date;
}
