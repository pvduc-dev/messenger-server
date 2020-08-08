import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Message } from './schemas/message.schema';
import { IModel } from '../core/interfaces/model.interface';
import { IMessage } from './interfaces/message.interface';
import { CreateMessageDto } from './dto/create-message-dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: IModel<IMessage>,
  ) {}

  public async getByConversationId(
    conversationId: string,
  ): Promise<IMessage[]> {
    return this.messageModel.paginate({ conversation: conversationId });
  }

  public create(createMessageDto: CreateMessageDto): Promise<IMessage> {
    const message = new this.messageModel(createMessageDto);
    return message.save();
  }

  public async remove(messageId: string): Promise<IMessage> {
    return this.messageModel.findByIdAndDelete(messageId);
  }
}
