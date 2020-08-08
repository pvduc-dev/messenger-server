import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Message {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
  })
  public conversation: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
  })
  public sender: string;

  @Prop({
    trim: true,
  })
  public content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
