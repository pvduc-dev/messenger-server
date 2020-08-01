import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { IUser } from './interfaces/user.interface';
import { IResponse } from '../core/interfaces/response.interface';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  public async find(): Promise<IResponse<IUser[]>> {
    const users = await this.usersService.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'Get user list successfully',
      data: users,
    };
  }

  @Get(':userId')
  public async findById(@Param('userId') userId: string): Promise<IResponse<IUser>> {
    const user =  await this.usersService.findById(userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get user successfully',
      data: user
    }
  }
}
