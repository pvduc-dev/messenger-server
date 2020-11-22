import { Module } from '@nestjs/common';
import { MessagesModule } from '@/messages/messages.module';
import { ConversationsController } from '@/conversations/conversations.controller';
import { ConversationsService } from '@/conversations/conversations.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Conversation,
  ConversationSchema,
} from '@/conversations/schemas/coversation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
    MessagesModule,
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService],
})
export class ConversationsModule {}
