import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email?: string;

  @IsString()
  public role?: string = 'Personal';

  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsArray()
  public accounts: Record<string, any>[];

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsBoolean()
  public active?: boolean = true;

  @IsUrl()
  public avatar?: string;
}
