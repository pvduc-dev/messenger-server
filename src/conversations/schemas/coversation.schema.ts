import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Conversation extends Document {
  @Prop()
  participants: string[];
}
const ConversationSchema = SchemaFactory.createForClass(Conversation);

ConversationSchema.plugin(require('mongoose-paginate-v2'));

export { ConversationSchema };
