import { IsNumber, IsString } from 'class-validator';

export class CreateManuscriptDto {
  @IsString()
  title: string;

  @IsString()
  file_url: string;

  @IsNumber()
  project_id: number;
}
