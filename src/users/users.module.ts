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
            if (this.isModified('accounts.password')) {
              try {
                const salt = await genSalt(8);
                const index = this.accounts.findIndex(
                  (account) => account.kind === 'internal',
                );
                if (index !== -1) {
                  this.accounts[index].password = await hash(
                    this.accounts[index].password,
                    salt,
                  );
                }
              } catch (e) {
                next(e);
              }
            }
          });
          UserSchema.method('isValidPassword', async function (
            plainText: string,
          ) {
            const index = this.accounts.findIndex(
              (account) => account.kind === 'internal',
            );
            return await compare(plainText, this.this.accounts[index].password);
          });
          UserSchema.plugin(require('mongoose-paginate-v2'));
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
