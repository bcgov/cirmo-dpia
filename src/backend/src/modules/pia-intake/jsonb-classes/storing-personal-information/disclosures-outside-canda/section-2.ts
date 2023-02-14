import { IsEnum, IsOptional, IsString } from '@nestjs/class-validator';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';

export class DisclosureSection2 {
  @IsEnum(YesNoInput)
  @IsOptional()
  relyOnExistingContract: YesNoInput;

  @IsString()
  @IsOptional()
  enterpriseServiceAccessDetails: string;
}
