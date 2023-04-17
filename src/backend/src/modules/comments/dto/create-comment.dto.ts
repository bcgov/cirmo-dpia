import { IsEnum, IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AllowedCommentPaths } from '../enums/allowed-comment-paths.enum';

export class CreateCommentDto {
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
    example: 1,
  })
  piaId: number;

  @IsEnum(AllowedCommentPaths)
  @ApiProperty({
    enum: AllowedCommentPaths,
    required: true,
    example: AllowedCommentPaths['collectionUseAndDisclosure.steps'],
  })
  path: AllowedCommentPaths;

  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    example: 'This is a sample comment',
  })
  text: string;
}
