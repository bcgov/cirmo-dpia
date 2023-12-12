import {
  IsNumber,
  IsString,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AllowedCommentPaths } from '../enums/allowed-comment-paths.enum';

// Custom validator to check if the provided 'path' starts with any of the allowed prefixes
@ValidatorConstraint({ name: 'startsWith', async: false })
export class StartsWithValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    // Loop through the allowed paths and check if the provided value starts with any of them
    for (const k in AllowedCommentPaths) {
      if (value.startsWith(AllowedCommentPaths[k])) return true;
    }
    // If none of the allowed paths match, return false
    return false;
  }

  // Default error message when validation fails
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

export class CreateCommentDto {
  @IsNumber()
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

  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    example: 'This is a sample comment',
  })
  text: string;
}
