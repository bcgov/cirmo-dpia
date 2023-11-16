import { IsEnum, IsObject, IsOptional } from '@nestjs/class-validator';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';
import { RichTextContent } from '../../rich-text-content';

export class DisclosureContract {
  @IsEnum(YesNoInput)
  @IsOptional()
  relyOnExistingContract?: YesNoInput;

  @IsObject()
  @IsOptional()
  enterpriseServiceAccessDetails?: RichTextContent;
}
