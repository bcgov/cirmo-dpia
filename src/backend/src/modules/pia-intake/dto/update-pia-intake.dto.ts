import { PartialType } from '@nestjs/swagger';
import { CreatePiaIntakeDto } from './create-pia-intake.dto';

export class UpdatePiaIntakeDto extends PartialType(CreatePiaIntakeDto) {}
