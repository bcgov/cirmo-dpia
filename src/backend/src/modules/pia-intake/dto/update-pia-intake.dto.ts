import { IsNotEmpty, IsNumber, IsPositive } from '@nestjs/class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePiaIntakeDto } from './create-pia-intake.dto';

export class UpdatePiaIntakeDto extends PartialType(CreatePiaIntakeDto) {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    type: Number,
    required: true,
    example: 2,
  })
  saveId: number;
}
