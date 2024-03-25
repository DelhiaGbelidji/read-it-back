import { IsString, MinLength, Matches } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  old_password: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message:
      'Password must contain at least one number, one uppercase and one lowercase letter, and be at least 8 characters long',
  })
  new_password: string;
}
