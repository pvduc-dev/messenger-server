import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { IUser } from '../users/interfaces/user.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Validate credentials
   * @param loginDto - Login data transfer object
   */
  public async validate(loginDto: LoginDto): Promise<IUser> {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (await user?.isValidPassword(loginDto.password)) {
      return user;
    }
    return null;
  }

  /**
   * Change new password for one user
   * @param user - The user document to change password
   * @param changePasswordDto
   */
  public async changePassword(user: IUser, changePasswordDto: ChangePasswordDto): Promise<void> {
    user.update({ password: changePasswordDto.newPassword });
  }

  /**
   * Generate a json web token from payload
   * @param payload
   * @author Pv Duc
   */
  public generateToken(payload: IJwtPayload): string {
    return this.jwtService.sign(payload)
  }
}
