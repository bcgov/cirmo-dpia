import { IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReplyDto {
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    example: 1,
  })
  commentId: number;

  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    example: 'This is a sample comment',
  })
  text: string;
}
