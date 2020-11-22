import { Injectable } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { LoginDto } from '@/auth/dto/login.dto';
import { IUser } from '@/users/interfaces/user.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '@/auth/interfaces/jwt-payload.interface';
import { SignUpDto } from '@/auth/dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validate credentials
   * @param signInDto - Sign in data transfer object
   * @author Pv Duc
   */
  public async validate(signInDto: LoginDto): Promise<IUser> {
    const user = await this.usersService.findByEmail(signInDto.email);
    if (await user?.isValidPassword(signInDto.password)) {
      return user;
    }
    return null;
  }

  /**
   * Sign up new user
   * @param signUpDto - Sign up data transfer object
   * @author Pv Duc
   */
  public async signUp(signUpDto: SignUpDto): Promise<void> {
    return this.usersService.create({
      email: signUpDto.email,
      firstName: signUpDto.firstName,
      lastName: signUpDto.lastName,
      accounts: [
        {
          kind: 'internal',
          password: signUpDto.password,
        },
      ],
    });
  }

  /**
   * Change new password for one user
   * @param user - The user document to change password
   * @param changePasswordDto
   * @author Pv Duc
   */
  public async changePassword(
    user: IUser,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    user.update({ password: changePasswordDto.newPassword });
  }

  /**
   * Generate a json web token from payload
   * @param payload
   * @author Pv Duc
   */
  public generateToken(payload: IJwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
