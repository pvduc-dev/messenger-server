import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { IModel } from '../core/interfaces/model.interface';
import { QueryUserDto } from './dto/query-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: IModel<IUser>,
  ) {}

  /**
   * Get a list of user
   * @param queryUserDto - The query user data transform object
   * @author Pv Duc
   */
  public async paginate(
    queryUserDto: QueryUserDto,
  ): Promise<Record<string, string>> {
    const { page, perPage, ...filter } = queryUserDto;
    return this.userModel.paginate(filter, {
      page: page,
      limit: perPage,
      select: '-accounts',
    });
  }

  /**
   * Find one user by id
   * @param userId - User id to find
   * @author Pv Duc
   */
  public async findById(userId: string): Promise<IUser> {
    return this.userModel.findById(userId).select('-accounts');
  }

  /**
   * Find one user by email
   * @param email - User email to find
   * @author Pv Duc
   */
  public async findByEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({ email });
  }

  /**
   * Find one user by Google id
   * @param googleId - The google id to get
   * @author Pv Duc
   */
  public async findByGoogleId(googleId: string): Promise<IUser> {
    return this.userModel.findOne({
      'accounts.kind': 'google',
      'accounts.id': googleId,
    });
  }

  /**
   * Create new user
   * @param createUserDto - Create user data transfer object
   * @author Pv Duc
   */
  public async create(createUserDto: CreateUserDto): Promise<void> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  /**
   * @param userId - The user id to update
   * @param updateUserDto - Update user data transfer object
   * @author Pv Duc
   */
  public async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return this.userModel.findByIdAndUpdate(userId, updateUserDto, {
      new: true,
      fields: ['-accounts'],
    });
  }
}
