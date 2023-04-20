import { IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FindCommentsCountDto {
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    type: Number,
    required: true,
    example: 1,
  })
  piaId: number;
}
