import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IResponse } from '../core/interfaces/response.interface';
import { IUser } from '../users/interfaces/user.interface';
import { User } from 'src/core/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('profile')
@ApiTags('profile')
export class ProfileController {
  @Get()
  @Auth()
  public get(@User() user: IUser): IResponse<IUser> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Get profile successfully',
      data: user,
    };
  }
}
