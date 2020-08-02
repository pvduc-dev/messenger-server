import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { genSalt, hash, compare } from 'bcrypt';
import { IUser } from './interfaces/user.interface';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: () => {
          UserSchema.pre<IUser>('save', async function (next) {
            if (this.isModified('password')) {
              try {
                const salt = await genSalt(8);
                this.password = await hash(this.password, salt);
              } catch (e) {
                next(e);
              }
            }
          });
          UserSchema.method('isValidPassword', async function (
            plainText: string,
          ) {
            return await compare(plainText, this.password);
          });
          return UserSchema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
