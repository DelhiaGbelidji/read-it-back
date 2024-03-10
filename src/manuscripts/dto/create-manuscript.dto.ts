import { IsNumber, IsString } from 'class-validator';

export class CreateManuscriptDto {
  @IsString()
  title: string;

  @IsString()
  file_url: string;

  @IsNumber()
  projectId: number;
}
