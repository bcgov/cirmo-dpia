import { IsEnum, IsOptional, IsString } from '@nestjs/class-validator';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';

export class DisclosureContract {
  @IsEnum(YesNoInput)
  @IsOptional()
  relyOnExistingContract?: YesNoInput;

  @IsString()
  @IsOptional()
  enterpriseServiceAccessDetails?: string;
}
