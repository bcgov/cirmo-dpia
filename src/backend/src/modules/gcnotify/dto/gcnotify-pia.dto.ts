import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GcNotifyEmailDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    required: true,
    example: 'simulate-delivered@notification.canada.ca',
  })
  mpoEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    example: 'Jane Doe',
  })
  mpoName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    example: 'Google Analytics',
  })
  piaTitle: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    example: 'pia.gov.bc.ca',
  })
  url: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    example: 1,
  })
  piaId: number;
}
