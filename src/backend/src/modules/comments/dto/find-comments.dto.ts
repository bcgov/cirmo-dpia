import { IsEnum, IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AllowedCommentPaths } from '../enums/allowed-comment-paths.enum';

export class FindCommentsDto {
  @IsNumber()
  @Type(() => Number)
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
}
