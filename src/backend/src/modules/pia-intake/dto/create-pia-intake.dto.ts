import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GovMinistriesEnum } from '../../../common/enums/gov-ministries.enum';
import { PiaIntakeStatusEnum } from '../enums/pia-intake-status.enum';
import { AccuracyCorrectionAndRetention } from '../jsonb-classes/accuracy-correction-and-retention';
import { AdditionalRisks } from '../jsonb-classes/additional-risks';
import { CollectionUseAndDisclosure } from '../jsonb-classes/collection-use-and-disclosure';
import { AgreementsAndInformationBanks } from '../jsonb-classes/agreements-and-information-banks';
import { SecurityPersonalInformation } from '../jsonb-classes/security-personal-information';
import { StoringPersonalInformation } from '../jsonb-classes/storing-personal-information';
import { piaIntakeEntityMock } from '../mocks/create-pia-intake.mock';

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

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false,
    example: piaIntakeEntityMock.isNextStepsSeenForDelegatedFlow,
  })
  isNextStepsSeenForDelegatedFlow: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false,
    example: piaIntakeEntityMock.isNextStepsSeenForNonDelegatedFlow,
  })
  isNextStepsSeenForNonDelegatedFlow: boolean;

  @IsObject()
  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CollectionUseAndDisclosure)
  @ApiProperty({
    type: CollectionUseAndDisclosure,
    required: false,
    example: piaIntakeEntityMock.collectionUseAndDisclosure,
  })
  collectionUseAndDisclosure: CollectionUseAndDisclosure;

  @IsObject()
  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => StoringPersonalInformation)
  @ApiProperty({
    type: StoringPersonalInformation,
    required: false,
    example: piaIntakeEntityMock.storingPersonalInformation,
  })
  storingPersonalInformation: StoringPersonalInformation;

  @IsObject()
  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => SecurityPersonalInformation)
  @ApiProperty({
    type: SecurityPersonalInformation,
    required: false,
    example: piaIntakeEntityMock.securityPersonalInformation,
  })
  securityPersonalInformation: SecurityPersonalInformation;

  @IsObject()
  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AccuracyCorrectionAndRetention)
  @ApiProperty({
    type: AccuracyCorrectionAndRetention,
    required: false,
    example: piaIntakeEntityMock.accuracyCorrectionAndRetention,
  })
  accuracyCorrectionAndRetention: AccuracyCorrectionAndRetention;

  @IsObject()
  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AgreementsAndInformationBanks)
  @ApiProperty({
    type: AgreementsAndInformationBanks,
    required: false,
    example: piaIntakeEntityMock.agreementsAndInformationBanks,
  })
  agreementsAndInformationBanks: AgreementsAndInformationBanks;

  @IsObject()
  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AdditionalRisks)
  @ApiProperty({
    type: AdditionalRisks,
    required: false,
    example: piaIntakeEntityMock.additionalRisks,
  })
  additionalRisks: AdditionalRisks;
}
