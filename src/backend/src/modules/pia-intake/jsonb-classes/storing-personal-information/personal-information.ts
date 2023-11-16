import { IsEnum, IsObject, IsOptional } from '@nestjs/class-validator';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';
import { RichTextContent } from '../rich-text-content';

export class PersonalInformation {
  @IsEnum(YesNoInput)
  @IsOptional()
  storedOutsideCanada?: YesNoInput;

  @IsObject()
  @IsOptional()
  whereDetails?: RichTextContent;
}
