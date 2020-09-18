import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';

@WebSocketGateway()
export class ConversationsGateway {
  @WebSocketServer() private readonly server: Server;

  constructor(private readonly conversationsService: ConversationsService) {}

  @SubscribeMessage('newConversation')
  public async handleNewConversation(
    @MessageBody() createConversationDto: CreateConversationDto,
  ): Promise<void> {
    await this.conversationsService.create(createConversationDto);
  }
}
