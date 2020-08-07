import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Message {
  conversation;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
