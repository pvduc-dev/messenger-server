import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
  @Prop({ unique: true, trim: true, lowercase: true })
  public email: string;

  @Prop({ required: true, default: 'personal' })
  public role: string;

  @Prop(
    raw([
      {
        kind: String,
        id: String,
        password: String,
        accessToken: String,
      },
    ]),
  )
  public accounts: Record<string, string>[];

  @Prop({ required: true })
  public firstName: string;

  @Prop({ required: true })
  public lastName: string;

  @Prop()
  public avatar: string;

  @Prop({ default: true })
  public active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
