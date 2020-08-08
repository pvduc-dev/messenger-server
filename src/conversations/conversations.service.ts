import { InjectModel } from '@nestjs/mongoose';
import { Conversation } from './schemas/coversation.schema';
import { IModel } from '../core/interfaces/model.interface';
import { IConversation } from './interfaces/conversation.interface';
import { IUser } from '../users/interfaces/user.interface';
import { CreateConversationDto } from './dto/create-conversation.dto';

export class ConversationsService {
  constructor(
    @InjectModel(Conversation.name)
    private readonly conversationModel: IModel<IConversation>,
  ) {}

  async getByUserId(userId: string): Promise<Record<string, any>> {
    return this.conversationModel.paginate({ participants: userId });
  }

  async create(conversationDto: CreateConversationDto): Promise<IUser> {
    const conversation = new this.conversationModel(conversationDto);
    return conversation.save();
  }
}
