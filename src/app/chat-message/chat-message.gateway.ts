import { WsServer } from 'src/@types/websocket';
import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { EEvent } from '@shared/enum/EEvent';

@WebSocketGateway()
export class ChatMessageGateway {
  @WebSocketServer()
  private server!: WsServer;

  @OnEvent(EEvent.NEW_CHAT_MESSAGE)
  handleMessage(payload: { message: string }): void {
    this.server.clients.forEach((client) => {
      client.send(
        'Hello world!'.concat(`${payload.message} - ${client.userId}`),
      );
    });
  }
}
