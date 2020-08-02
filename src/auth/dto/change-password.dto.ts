import { IsString, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @Length(8, 24)
  public password: string;

  @IsString()
  @Length(8, 24)
  public newPassword: string;
}
