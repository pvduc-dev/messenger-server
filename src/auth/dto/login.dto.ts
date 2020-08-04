import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  public email: string;

  @IsString()
  @Length(8, 24)
  public password: string;
}
