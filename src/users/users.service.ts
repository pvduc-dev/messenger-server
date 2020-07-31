import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>
  ) {}

  /**
   * Create new user
   * @param createUserDto - Create user data transfer object
   * @author Pv Duc
   */
  public async create(createUserDto: CreateUserDto): Promise<IUser> {
    return await this.userModel.create<CreateUserDto>(createUserDto);
  }
}
