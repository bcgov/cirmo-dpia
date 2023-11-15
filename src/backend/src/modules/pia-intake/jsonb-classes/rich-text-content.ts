import { IsString } from '@nestjs/class-validator';

// Rich text editor content and changes.
export class RichTextContent {
  @IsString()
  content: string;
}
