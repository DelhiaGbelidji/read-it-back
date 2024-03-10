import { PartialType } from '@nestjs/mapped-types';
import { CreateManuscriptDto } from './create-manuscript.dto';
import { IsString } from 'class-validator';

export class UpdateManuscriptDto extends PartialType(CreateManuscriptDto) {
  @IsString()
  title: string;

  @IsString()
  file_url: string;
}
