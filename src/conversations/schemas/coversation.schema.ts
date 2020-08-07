import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Conversation extends Document {
  @Prop()
  participants: string[];
}
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
