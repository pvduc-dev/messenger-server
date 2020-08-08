import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Client, Server } from 'socket.io';

@WebSocketGateway()
export class ConversationsGateway implements OnGatewayConnection {
  @WebSocketServer() private readonly server: Server;

  public handleConnection(client: Client): any {
    console.log(client.id);
  }
}
