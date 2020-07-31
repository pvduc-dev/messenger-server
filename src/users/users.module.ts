import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { genSalt, hash } from 'bcrypt';
import { IUser } from './interfaces/user.interface';
import { ConfigService } from '@nestjs/config';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: (configService: ConfigService) => {
          UserSchema.pre<IUser>('save', async function(next) {
            if (this.isModified('password')) {
              try {
                const salt = await genSalt(+configService.get<number>('HASH_SALT'));
                this.password = await hash(this.password, salt);
              } catch (e) {
                next(e);
              }
            }
          })
          return UserSchema;
        },
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
