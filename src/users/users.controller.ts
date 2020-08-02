import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IUser } from './interfaces/user.interface';
import { IResponse } from '../core/interfaces/response.interface';
import { IPage } from '../core/interfaces/page.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async find(): Promise<IResponse<IPage<IUser>>> {
    const users = await this.usersService.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'Get user list successfully',
      data: {
        page: 1,
        size: 24,
        records: users,
      },
    };
  }

  @Get(':userId')
  public async findById(
    @Param('userId') userId: string,
  ): Promise<IResponse<IUser>> {
    const user = await this.usersService.findById(userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get user successfully',
      data: user,
    };
  }

  @Post()
  public async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IResponse<any>> {
    await this.usersService.create(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Created new user successfully',
    };
  }

  @Put(':userId')
  public async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IResponse<IUser>> {
    const updatedUser = await this.usersService.update(userId, updateUserDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Update user successfully',
      data: updatedUser,
    };
  }
}
