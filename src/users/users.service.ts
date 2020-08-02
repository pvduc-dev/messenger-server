import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignUpDto } from '../auth/dto/sign-up.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  /**
   * Get a list of users
   * @author Pv Duc
   */
  public async find(): Promise<IUser[]> {
    return this.userModel.find().select('-password').exec();
  }

  /**
   * Find one user by id
   * @param userId - User id to find
   * @author Pv Duc
   */
  public async findById(userId: string): Promise<IUser> {
    return this.userModel.findById(userId).select('-password').exec();
  }

  /**
   * Find one user by email
   * @param email - User email to find
   */
  public async findByEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({ email }).exec();
  }

  public async create(createUserDto: CreateUserDto): Promise<void> {
    await this.userModel.create<CreateUserDto>(createUserDto);
  }

  public async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return this.userModel.findByIdAndUpdate(userId, updateUserDto, {
      new: true,
      fields: ['-password'],
    });
  }
}
