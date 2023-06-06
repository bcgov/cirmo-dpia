import { IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateInviteDto {
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    example: 1,
  })
  piaId: number;
}
