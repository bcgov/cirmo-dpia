import { IsEnum, IsOptional, IsString } from '@nestjs/class-validator';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';

export class PersonalInformation {
  @IsEnum(YesNoInput)
  @IsOptional()
  storedOutsideCanada: YesNoInput;

  @IsString()
  @IsOptional()
  whereDetails: string;
}
