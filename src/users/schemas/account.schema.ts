import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IAccount } from '../interfaces/account.interface';
import { genSalt, hash } from 'bcrypt';

@Schema()
export class Account extends Document {
  @Prop({ required: true })
  public kind: string;

  @Prop()
  public password: string;

  @Prop()
  public id: string;

  @Prop()
  public accessToken: string;
}

const AccountSchema = SchemaFactory.createForClass(Account);

AccountSchema.pre<IAccount>('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await genSalt(8);
      this.password = await hash(this.password, salt);
    } catch (e) {
      next(e);
    }
  }
});

export { AccountSchema };
