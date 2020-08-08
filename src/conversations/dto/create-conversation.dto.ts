import { IsArray } from 'class-validator';

export class CreateConversationDto {
  @IsArray()
  public participants: string[];
}
