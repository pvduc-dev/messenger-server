import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { IResponse } from '../core/interfaces/response.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { IUser } from '../users/interfaces/user.interface';
import { User } from '../core/user.decorator';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public async signIn(@Body() signInDto: SignInDto): Promise<IResponse<any>> {
    const user = await this.authService.validate(signInDto);
    if (!!user) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Sign in successfully',
        data: {
          accessToken: this.authService.generateToken({
            sub: user.id,
          }),
          roles: user.roles,
        },
      };
    }
    throw new BadRequestException('Invalid credentials');
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  public async signUp(@Body() signUpDto: SignUpDto): Promise<IResponse<any>> {
    await this.authService.signUp(signUpDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Sign up successfully',
    };
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  public async changePassword(
    @User() user: IUser,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<IResponse<any>> {
    const validatedUser = await this.authService.validate({
      email: user.email,
      password: changePasswordDto.password,
    });
    if (!!validatedUser) {
      await this.authService.changePassword(user, changePasswordDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Change password successfully',
      };
    }
    throw new BadRequestException('Invalid credentials');
  }
}
