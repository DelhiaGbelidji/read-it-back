import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  image?: string;
}
