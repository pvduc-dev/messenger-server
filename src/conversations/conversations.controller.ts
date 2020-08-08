import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { IResponse } from '../core/interfaces/response.interface';
import { MessagesService } from '../messages/messages.service';
import { ConversationsService } from './conversations.service';
import { User } from '../core/user.decorator';
import { IUser } from '../users/interfaces/user.interface';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Controller('conversations')
@ApiTags('conversations')
export class ConversationsController {
  constructor(
    private readonly conversationsService: ConversationsService,
    private readonly messagesService: MessagesService,
  ) {}

  @Get()
  @Auth()
  public async getByUserId(
    @User() user: IUser,
  ): Promise<IResponse<Record<string, any>>> {
    const conversations = await this.conversationsService.getByUserId(user.id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get conversations successfully',
      data: conversations,
    };
  }

  @Get(':conversationId/messages')
  public async getMessages(
    @Param() conversationId: string,
  ): Promise<IResponse<Record<string, any>>> {
    const pagination = await this.messagesService.getByConversationId(
      conversationId,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get messages successfully',
      data: pagination,
    };
  }

  @Post()
  public async create(
    @Body() createConversationDto: CreateConversationDto,
  ): Promise<IResponse<any>> {
    const conversation = await this.conversationsService.create(
      createConversationDto,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create new conversation successfully',
      data: conversation,
    };
  }
}
