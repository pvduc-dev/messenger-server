import {
  IsBoolean, IsDateString,
  IsEmail,
  IsNotEmpty, IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @Length(8, 24)
  public password: string;

  @IsString()
  public role?: string = 'Personal';

  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsBoolean()
  public isActive?: boolean = true;

  @IsDateString()
  @IsOptional()
  public createdAt?: string;
}
