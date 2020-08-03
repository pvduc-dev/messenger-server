import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { IResponse } from '../core/interfaces/response.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { IUser } from '../users/interfaces/user.interface';
import { User } from '../core/user.decorator';
import { SignUpDto } from './dto/sign-up.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public async signIn(
    @Body() signInDto: SignInDto,
    @Res() response: Response,
  ): Promise<any> {
    const user: IUser = await this.authService.validate(signInDto);
    if (!!user) {
      const accessToken = this.authService.generateToken({
        sub: user.id,
      });
      response.cookie('accessToken', accessToken, {
        httpOnly: true,
        path: '/',
      });
      return response.status(200).json({
        statusCode: HttpStatus.OK,
        message: 'Sign in successfully',
        data: {
          accessToken: accessToken,
          email: user.email,
          role: user.role,
        },
      });
    }
    throw new BadRequestException('Invalid credentials');
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOAuth2(['profile', 'email', 'openid'], 'google')
  public google(@User() user: IUser, @Res() response: Response): any {
    response.cookie('accessToken', 1234, { httpOnly: true, path: '/' });
    response.redirect('/', 302);
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
