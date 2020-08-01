import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { IResponse } from '../core/interfaces/response.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { IUser } from '../users/interfaces/user.interface';
import { User } from '../core/user.decorator';
import { useContainer } from 'class-validator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: LoginDto): Promise<IResponse<any>> {
    const user = await this.authService.validate(loginDto);
    if (!!user) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Login successfully',
        data: {
          accessToken: this.authService.generateToken({
            sub: user.id
          }),
          roles: user.roles
        }
      }
    }
    throw new BadRequestException('Invalid credentials')
  }

  @Post('change-password')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  public async changePassword(@User() user: IUser, @Body() changePasswordDto: ChangePasswordDto): Promise<IResponse<any>> {
    const validatedUser = await this.authService.validate({
      email: user.email,
      password: changePasswordDto.currentPassword,
    });
    if (!!validatedUser) {
      await this.authService.changePassword(user, changePasswordDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Change password successfully',
      }
    }
    throw new BadRequestException('Invalid credentials')
  }
}
