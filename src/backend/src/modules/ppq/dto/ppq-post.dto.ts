import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { GovMinistriesEnum } from 'src/common/enums/gov-ministries.enum';
import { YesNoNotSureEnum } from 'src/common/enums/yes-no-not-sure.enum';
import { PpqOtherFactorsEnum } from '../enums/ppq-other-factors.enum';
import { PpqPiaTypesEnum } from '../enums/ppq-pia-types.enum';

export class PpqPostDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({ type: String, required: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  @ApiProperty({ type: String, required: true })
  email: string;

  @IsEnum(GovMinistriesEnum)
  @IsNotEmpty()
  @ApiProperty({
    enum: GovMinistriesEnum,
    required: true,
    example: GovMinistriesEnum.HEALTH,
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
    example: 'Add Figma to BC Gov Project',
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

  @IsEnum(PpqPiaTypesEnum)
  @IsNotEmpty()
  @ApiProperty({ enum: PpqPiaTypesEnum, required: true })
  piaType: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    enum: YesNoNotSureEnum,
    required: true,
    example: YesNoNotSureEnum.YES,
  })
  containsPersonalInformation: string;

  @IsEnum(PpqOtherFactorsEnum, { each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty({
    enum: PpqOtherFactorsEnum,
    isArray: true,
    example: [
      PpqOtherFactorsEnum.HAS_BC_SERVICES_CARD_ONBOARDING,
      PpqOtherFactorsEnum.HAS_SENSITIVE_PERSONAL_INFORMATION,
    ],
  })
  otherFactors?: PpqOtherFactorsEnum[];

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({ type: Date, required: false })
  proposedStartDate?: Date;
}
