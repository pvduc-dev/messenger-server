import { InjectModel } from '@nestjs/mongoose';
import { Conversation } from '@/conversations/schemas/coversation.schema';
import { IModel } from '@/core/interfaces/model.interface';
import { IConversation } from '@/conversations/interfaces/conversation.interface';
import { IUser } from '@/users/interfaces/user.interface';
import { CreateConversationDto } from '@/conversations/dto/create-conversation.dto';

export class ConversationsService {
  constructor(
    @InjectModel(Conversation.name)
    private readonly conversationModel: IModel<IConversation>,
  ) {}

  public async findById(conversationId: string): Promise<IConversation> {
    return this.conversationModel.findById(conversationId);
  }

  async findByUserId(userId: string): Promise<Record<string, any>> {
    return this.conversationModel.paginate({ participants: userId });
  }

  async create(conversationDto: CreateConversationDto): Promise<IUser> {
    const conversation = new this.conversationModel(conversationDto);
    return conversation.save();
  }
}
