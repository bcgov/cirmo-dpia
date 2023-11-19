import { IsObject, IsOptional } from '@nestjs/class-validator';
import { RichTextContent } from '../rich-text-content';

export class Accuracy {
  @IsObject()
  @IsOptional()
  description?: RichTextContent;
}
