import { Module } from '@nestjs/common';
import { MessagesModule } from '../messages/messages.module';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation, ConversationSchema } from './schemas/coversation.schema';
import { ConversationsGateway } from './conversations.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
    MessagesModule,
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService, ConversationsGateway],
})
export class ConversationsModule {}
