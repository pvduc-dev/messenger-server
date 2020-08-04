import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  public role: string;

  @IsBoolean()
  @IsOptional()
  public active: boolean;
}
