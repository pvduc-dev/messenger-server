import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public firstName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public lastName?: string;
}
