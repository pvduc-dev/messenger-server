import { Controller } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('message')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
}
