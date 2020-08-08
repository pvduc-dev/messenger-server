import { IsArray } from 'class-validator';

export class CreateConversationDto {
  public participants: string[];

  public createdAt: string[];
}
