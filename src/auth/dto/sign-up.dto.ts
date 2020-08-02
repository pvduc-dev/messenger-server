import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  public email: string;

  @IsString()
  @Length(8, 24)
  public password: string;

  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;
}
