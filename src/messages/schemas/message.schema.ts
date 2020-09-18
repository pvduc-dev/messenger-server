import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
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

const MessageSchema = SchemaFactory.createForClass(Message);

MessageSchema.plugin(require('mongoose-paginate-v2'));

export { MessageSchema };
