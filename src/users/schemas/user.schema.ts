import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  public email: string;

  @Prop({ required: true })
  public password: string;

  @Prop({ required: true })
  public role: string;

  @Prop({ required: true })
  public firstName: string;

  @Prop({ required: true })
  public lastName: string;

  @Prop()
  public avatar: string;

  @Prop({ default: true })
  public isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
