import {
  IsBooleanString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class QueryUserDto {
  @IsNumberString()
  @IsOptional()
  public page?: string = '1';

  @IsNumberString()
  @IsOptional()
  public perPage?: string = '16';

  @IsString()
  @IsOptional()
  public fields?: string;

  @IsString()
  @IsOptional()
  @IsEnum(['administrator', 'moderator', 'personal'])
  public role?: string;

  @IsBooleanString()
  @IsOptional()
  public active?: string;
}
