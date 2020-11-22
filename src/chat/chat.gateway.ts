import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SharedService } from '@/shared/shared.service';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  public connectedUsers: Map<string, Set<string>> = new Map();

  constructor(
    private readonly sharedService: SharedService,
    private readonly jwtService: JwtService,
  ) {}

  public handleConnection(client: Socket): void {
    const cookie: Record<string, string> = this.sharedService.parserCookie(
      client.handshake.headers.cookie,
    );
    const { accessToken } = cookie;
    try {
      const { sub: userId } = this.jwtService.verify(accessToken);
      client.request.userId = userId;
      if (this.connectedUsers.has(userId)) {
        this.connectedUsers.get('user.sub').add(client.id);
      } else {
        this.connectedUsers.set('user.id', new Set<string>(client.id));
      }
    } catch (e) {
      client.disconnect(true);
    }
  }

  public handleDisconnect(client: Socket): void {
    const { userId } = client.request;
    if (this.connectedUsers.get(userId).size === 1) {
      this.connectedUsers.delete(userId);
    } else {
      this.connectedUsers.get(userId).delete(client.id);
    }
  }
}
