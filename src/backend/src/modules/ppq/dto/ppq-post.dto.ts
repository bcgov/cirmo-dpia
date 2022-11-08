import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { GovMinistriesEnum } from '../../../common/enums/gov-ministries.enum';
import { PiaTypesEnum } from '../../../common/enums/pia-types.enum';
import { DelegatedReviewTypesEnum } from 'src/common/enums/delegated-review-types.enum';

export class PpqPostDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    example: 'Add Figma to my BC Gov Project',
  })
  title: string;

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
  @ApiProperty({ type: String, required: false })
  description: string;

  @IsEnum(PiaTypesEnum)
  @IsNotEmpty()
  @ApiProperty({
    enum: PiaTypesEnum,
    required: true,
    example: PiaTypesEnum.STANDARD,
  })
  piaType: PiaTypesEnum;

  @IsEnum(DelegatedReviewTypesEnum)
  @IsOptional()
  @ApiProperty({
    enum: DelegatedReviewTypesEnum,
    required: false,
    example: DelegatedReviewTypesEnum.CHECKLIST,
  })
  delegatedReviewType: DelegatedReviewTypesEnum;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({ type: Date, required: false })
  proposedStartDate?: Date;

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
  hasDataLinking: boolean;

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
}
