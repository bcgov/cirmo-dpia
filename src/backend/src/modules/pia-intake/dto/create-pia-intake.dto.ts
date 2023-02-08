import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GovMinistriesEnum } from '../../../common/enums/gov-ministries.enum';
import { PiaIntakeStatusEnum } from '../enums/pia-intake-status.enum';

export const piaIntakeEntityMock = {
  title: 'Test PIA for screening King Richard',
  ministry: GovMinistriesEnum.TOURISM_ARTS_CULTURE_AND_SPORT,
  branch: 'Entertainment',
  status: PiaIntakeStatusEnum.INCOMPLETE,
  drafterName: 'Will Smith',
  drafterTitle: 'Actor',
  drafterEmail: 'will@test.bc.gov.in',
  leadName: 'King Richard',
  leadTitle: 'Chief Guiding Officer',
  leadEmail: 'king@test.bc.gov.in',
  mpoName: 'Reinaldo Marcus Green',
  mpoEmail: 'reinaldo@test.bc.gov.in',
  initiativeDescription: `*King Richard* is a 2021 American biographical sports drama film directed by [Reinaldo Marcus Green](https://en.wikipedia.org/wiki/Reinaldo_Marcus_Green) and written by [Zach Baylin](https://en.wikipedia.org/wiki/Zach_Baylin). The film stars [Will Smith](https://en.wikipedia.org/wiki/Will_Smith) as Richard Williams, the father and coach of famed tennis players [Venus](https://en.wikipedia.org/wiki/Venus_Williams) and [Serena Williams](https://en.wikipedia.org/wiki/Serena_Williams) (both of whom served as executive producers on the film), with [Aunjanue Ellis](https://en.wikipedia.org/wiki/Aunjanue_Ellis), [Saniyya Sidney](https://en.wikipedia.org/wiki/Saniyya_Sidney), [Demi Singleton](https://en.wikipedia.org/wiki/Demi_Singleton), [Tony Goldwyn](https://en.wikipedia.org/wiki/Tony_Goldwyn), and [Jon Bernthal](https://en.wikipedia.org/wiki/Jon_Bernthal) in supporting roles.`,
  initiativeScope: `Richard Williams lives in [Compton, California](https://en.wikipedia.org/wiki/Compton,_California), with his wife Brandy, his three step-daughters, and his two daughters, Venus and Serena. Richard aspires to turn Venus and Serena into professional tennis players; he has prepared a plan for success since before they were born. Richard and Brandy coach Venus and Serena on a daily basis, while also working as a security guard and a nurse, respectively. Richard works tirelessly to find a professional coach for the girls, creating brochures and videotapes to advertise their skills, but has not had success.`,
  dataElementsInvolved: `Cast Involved:
    
  1. Will Smith as Richard Williams
  2. Aunjanue Ellis as Oracene "Brandy" Price
  3. Saniyya Sidney as Venus Williams
  4. Demi Singleton as Serena Williams
  5. Jon Bernthal as Rick Macci
  6. Tony Goldwyn as Paul Cohen
  7. Mikayla LaShae Bartholomew as Tunde Price
  `,
  hasAddedPiToDataElements: false,
  submittedAt: new Date(),
  riskMitigation: `The film was released on [Blu-ray](https://en.wikipedia.org/wiki/Blu-ray) and [DVD](https://en.wikipedia.org/wiki/DVD) February 8, 2022 by [Warner Bros. Home Entertainment](https://en.wikipedia.org/wiki/Warner_Bros._Home_Entertainment), with the 4K Ultra HD release through [Warner Archive Collection](https://en.wikipedia.org/wiki/Warner_Archive_Collection) on the same date.`,
};

export class CreatePiaIntakeDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    example: piaIntakeEntityMock.title,
  })
  title: string;

  @IsEnum(GovMinistriesEnum)
  @IsOptional()
  @ApiProperty({
    enum: GovMinistriesEnum,
    required: false,
    example: piaIntakeEntityMock.ministry,
  })
  ministry: GovMinistriesEnum;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    example: piaIntakeEntityMock.branch,
  })
  branch: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    example: piaIntakeEntityMock.drafterName,
  })
  drafterName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: true,
    example: piaIntakeEntityMock.drafterTitle,
  })
  drafterTitle: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    type: String,
    required: false,
    example: piaIntakeEntityMock.drafterEmail,
  })
  drafterEmail: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    example: piaIntakeEntityMock.leadName,
  })
  leadName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    example: piaIntakeEntityMock.leadTitle,
  })
  leadTitle: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    type: String,
    required: false,
    example: piaIntakeEntityMock.leadEmail,
  })
  leadEmail: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    example: piaIntakeEntityMock.mpoName,
  })
  mpoName: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    type: String,
    required: false,
    example: piaIntakeEntityMock.mpoEmail,
  })
  mpoEmail: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    example: piaIntakeEntityMock.initiativeDescription,
  })
  initiativeDescription: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    example: piaIntakeEntityMock.initiativeScope,
  })
  initiativeScope: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    example: piaIntakeEntityMock.dataElementsInvolved,
  })
  dataElementsInvolved: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false,
    example: piaIntakeEntityMock.hasAddedPiToDataElements,
  })
  hasAddedPiToDataElements: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    example: piaIntakeEntityMock.riskMitigation,
  })
  riskMitigation: string;

  @IsEnum(PiaIntakeStatusEnum)
  @IsOptional()
  @ApiProperty({
    enum: PiaIntakeStatusEnum,
    required: false,
    example: PiaIntakeStatusEnum.MPO_REVIEW,
  })
  status: PiaIntakeStatusEnum;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    example: new Date(),
  })
  submittedAt: Date;
}
