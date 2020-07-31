import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  public email: string;

  @Prop({
    required: true,
  })
  public password: string;

  @Prop()
  public firstName: string;

  @Prop()
  public lastName: string;

  @Prop()
  public avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
