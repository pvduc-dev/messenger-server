import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AccountSchema } from './account.schema';
import { compare } from 'bcrypt';

@Schema({ timestamps: true, toObject: { virtuals: true, getters: true } })
export class User extends Document {
  @Prop({ unique: true, trim: true, lowercase: true })
  public email: string;

  @Prop({ required: true, default: 'personal' })
  public role: string;

  @Prop(raw([AccountSchema]))
  public accounts: Record<string, any>;

  @Prop({ required: true })
  public firstName: string;

  @Prop({ required: true })
  public lastName: string;

  @Prop()
  public avatar: string;

  @Prop({ default: true })
  public active: boolean;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.method('isValidPassword', async function (plainText: string) {
  const index = this.accounts.findIndex(
    (account) => account.kind === 'internal',
  );
  return compare(plainText, this.accounts[index].password);
});

UserSchema.plugin(require('mongoose-paginate-v2'));

export { UserSchema };
