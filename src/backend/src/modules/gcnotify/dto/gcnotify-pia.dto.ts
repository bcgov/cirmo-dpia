import { IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GcNotifyEmailDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    example: 'Google Analytics',
  })
  piaTitle: string;

  @IsString()
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
