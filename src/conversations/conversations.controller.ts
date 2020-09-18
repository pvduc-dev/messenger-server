import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
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
  public async findByUserId(
    @User() user: IUser,
  ): Promise<IResponse<Record<string, any>>> {
    const conversations = await this.conversationsService.findByUserId(user.id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get conversations successfully',
      data: conversations,
    };
  }

  @Get(':conversationId/messages')
  @Auth()
  public async findMessages(
    @User() user: IUser,
    @Param('conversationId') conversationId: string,
  ): Promise<IResponse<Record<string, any>>> {
    const conversation = await this.conversationsService.findById(
      conversationId,
    );
    if (conversation?.participants.includes(user.id)) {
      const pagination = await this.messagesService.getByConversationId(
        conversationId,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Get messages successfully',
        data: pagination,
      };
    }
    if (!!conversation) {
      throw new ForbiddenException();
    }
    throw new NotFoundException();
  }

  // @Post()
  // @Auth()
  // public async create(
  //   @User() user: IUser,
  //   @Body() createConversationDto: CreateConversationDto,
  // ): Promise<IResponse<any>> {
  //   const conversation = await this.conversationsService.create({
  //     participants: [user.id, ...createConversationDto.participants],
  //   });
  //   return {
  //     statusCode: HttpStatus.CREATED,
  //     message: 'Create new conversation successfully',
  //     data: conversation,
  //   };
  // }
}
