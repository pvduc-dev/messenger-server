import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { IModel } from '../core/interfaces/model.interface';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: IModel<IUser>) {}

  /**
   * Get a list of users
   * @author Pv Duc
   */
  public async paginate(queryUserDto: QueryUserDto): Promise<any> {
    const { page, perPage, fields, ...filter } = queryUserDto;
    return this.userModel.paginate(filter, {
      page: page,
      limit: perPage,
      select: '-password',
    });
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
