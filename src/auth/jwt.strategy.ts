import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifiedCallback } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@/users/users.service';
import { IJwtPayload } from '@/auth/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: (req) => req.cookies['accessToken'],
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: IJwtPayload, done: VerifiedCallback): Promise<void> {
    try {
      const user = await this.usersService.findById(payload.sub);
      if (!!user) {
        return done(null, user);
      }
      return done(null);
    } catch (error) {
      return done(error);
    }
  }
}
