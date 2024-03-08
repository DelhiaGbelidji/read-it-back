import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, {
    message:
      'Password must contain at least one number, one uppercase and one lowercase letter, and be at least 5 characters long',
  })
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsEmail()
  email: string;
}

export class ChangePasswordDto {
  @IsString()
  old_password: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, {
    message:
      'Password must contain at least one number, one uppercase and one lowercase letter, and be at least 5 characters long',
  })
  new_password: string;
}
