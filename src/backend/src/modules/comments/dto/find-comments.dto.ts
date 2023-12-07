import {
  IsNumber,
  IsString,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AllowedCommentPaths } from '../enums/allowed-comment-paths.enum';

// Custom validator to check if the provided 'path' starts with any of the allowed prefixes
@ValidatorConstraint({ name: 'startsWith', async: false })
export class StartsWithValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    for (const k in AllowedCommentPaths) {
      if (value.startsWith(AllowedCommentPaths[k])) return true;
    }
    return false;
  }

  defaultMessage() {
    return 'Not allowed path';
  }
}

// Custom decorator to apply the 'StartsWithValidator' to the 'path' property
export function StartsWith(validationOptions?: any) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: StartsWithValidator,
    });
  };
}

export class FindCommentsDto {
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    type: Number,
    required: true,
    example: 1,
  })
  piaId: number;

  // Apply the custom 'StartsWith' validator to the 'path' property
  @IsString()
  @StartsWith()
  @ApiProperty({
    type: String,
    required: true,
    example: 'collectionUseAndDisclosure.steps-{timestamp}-{randomPart}',
  })
  path: AllowedCommentPaths;
}
