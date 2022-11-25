import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GovMinistriesEnum } from '../../../common/enums/gov-ministries.enum';

export class CreatePiaIntakeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    example: 'Test PIA for screening King Richard',
  })
  title: string;

  @IsEnum(GovMinistriesEnum)
  @IsNotEmpty()
  @ApiProperty({
    enum: GovMinistriesEnum,
    required: true,
    example: GovMinistriesEnum.TOURISM_ARTS_CULTURE_AND_SPORT,
  })
  ministry: GovMinistriesEnum;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    example: 'Entertainment',
  })
  branch: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    example: 'Will Smith',
  })
  drafterName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    example: 'Actor',
  })
  drafterTitle: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    required: true,
    example: 'will@test.bc.gov.in',
  })
  drafterEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    example: 'King Richard',
  })
  leadName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    example: 'Chief Guiding Officer',
  })
  leadTitle: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    required: true,
    example: 'king@test.bc.gov.in',
  })
  leadEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    example: 'Reinaldo Marcus Green',
  })
  mpoName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    required: true,
    example: 'reinaldo@test.bc.gov.in',
  })
  mpoEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: false,
    example: `*King Richard* is a 2021 American biographical sports drama film directed by [Reinaldo Marcus Green](https://en.wikipedia.org/wiki/Reinaldo_Marcus_Green) and written by [Zach Baylin](https://en.wikipedia.org/wiki/Zach_Baylin). The film stars [Will Smith](https://en.wikipedia.org/wiki/Will_Smith) as Richard Williams, the father and coach of famed tennis players [Venus](https://en.wikipedia.org/wiki/Venus_Williams) and [Serena Williams](https://en.wikipedia.org/wiki/Serena_Williams) (both of whom served as executive producers on the film), with [Aunjanue Ellis](https://en.wikipedia.org/wiki/Aunjanue_Ellis), [Saniyya Sidney](https://en.wikipedia.org/wiki/Saniyya_Sidney), [Demi Singleton](https://en.wikipedia.org/wiki/Demi_Singleton), [Tony Goldwyn](https://en.wikipedia.org/wiki/Tony_Goldwyn), and [Jon Bernthal](https://en.wikipedia.org/wiki/Jon_Bernthal) in supporting roles.`,
  })
  initiativeDescription: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: false,
    example: `Richard Williams lives in [Compton, California](https://en.wikipedia.org/wiki/Compton,_California), with his wife Brandy, his three step-daughters, and his two daughters, Venus and Serena. Richard aspires to turn Venus and Serena into professional tennis players; he has prepared a plan for success since before they were born. Richard and Brandy coach Venus and Serena on a daily basis, while also working as a security guard and a nurse, respectively. Richard works tirelessly to find a professional coach for the girls, creating brochures and videotapes to advertise their skills, but has not had success.`,
  })
  initiativeScope: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: false,
    example: `Cast Involved: 
        1. Will Smith as Richard Williams
        2. Aunjanue Ellis as Oracene "Brandy" Price
        3. Saniyya Sidney as Venus Williams
        4. Demi Singleton as Serena Williams
        5. Jon Bernthal as Rick Macci
        6. Tony Goldwyn as Paul Cohen
        7. Mikayla LaShae Bartholomew as Tunde Price
        8. Danielle Lawson as Isha Price
        9. Layla Crawford as Lyndrea Price 
        
        \`and more...\`
    `,
  })
  dataElementsInvolved: string;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    required: false,
    example: false,
  })
  hasAddedPiToDataElements: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: false,
    example: `The film was released on [Blu-ray](https://en.wikipedia.org/wiki/Blu-ray) and [DVD](https://en.wikipedia.org/wiki/DVD) February 8, 2022 by [Warner Bros. Home Entertainment](https://en.wikipedia.org/wiki/Warner_Bros._Home_Entertainment), with the 4K Ultra HD release through [Warner Archive Collection](https://en.wikipedia.org/wiki/Warner_Archive_Collection) on the same date.`,
  })
  riskMitigation: string;
}
