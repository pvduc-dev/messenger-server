import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(24)
  public password: string;
}
