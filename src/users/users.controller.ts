import {
  Request,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { IUser } from './interfaces/user.interface';
import { IResponse } from '../core/interfaces/response.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { QueryUserDto } from './dto/query-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async paginate(
    @Query() queryUserDto: QueryUserDto,
    @Request() request: any,
  ): Promise<IResponse<any>> {
    console.log(request.clientIp);
    console.log(request.useragent);
    const pagination = await this.usersService.paginate(queryUserDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get user list successfully',
      data: pagination,
    };
  }

  @Get(':userId')
  @Auth(['moderator', 'administrator'])
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
  @Auth(['administrator'])
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
  @Auth(['administrator'])
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
