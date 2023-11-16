import { IsEnum, IsObject, IsOptional } from '@nestjs/class-validator';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';
import { RichTextContent } from '../rich-text-content';

export class Retention {
  @IsEnum(YesNoInput)
  @IsOptional()
  usePIForDecision?: YesNoInput;

  @IsEnum(YesNoInput)
  @IsOptional()
  haveApprovedInfoSchedule?: YesNoInput;

  @IsObject()
  @IsOptional()
  describeRetention?: RichTextContent;
}
