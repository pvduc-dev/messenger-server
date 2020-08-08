import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsMongoId()
  public conversation: string;

  @IsString()
  @IsNotEmpty()
  public content: string;
}
