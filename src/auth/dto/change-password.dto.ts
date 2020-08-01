import { IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  @MaxLength(24)
  public currentPassword: string;

  @IsString()
  @MinLength(8)
  @MaxLength(24)
  public newPassword: string;
}
