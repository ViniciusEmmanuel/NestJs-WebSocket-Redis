import * as WebSocket from 'ws';
import { WebSocketAdapter, INestApplicationContext } from '@nestjs/common';
import { WsAdapter as WsAdapterNest } from '@nestjs/platform-ws';
import IAccessTokenService from '@providers/interfaces/IAccessTokenService';

type WsServer = WebSocket.Server;

type Callback = (...args: any) => void;

export class WsAdapter extends WsAdapterNest implements WebSocketAdapter {
  private readonly PORT: number;

  private server!: WsServer;

  private accessToken: IAccessTokenService;

  constructor(
    app: INestApplicationContext,
    port: number,
    accessToken: IAccessTokenService,
  ) {
    super(app);
    this.PORT = port;
    this.accessToken = accessToken;
  }

  create(port: number, options: any = {}): any {
    const wsPort = port || this.PORT;
    this.server = Object.assign(
      new WebSocket.Server({ port: wsPort, ...options }),
      { users: new Map() },
    );
    return this.server;
  }

  bindClientConnect(server: WsServer, callback: Callback): void {
    server.on('connection', (socket, request) => {
      const url = new URL('ws://localhost'.concat(String(request.url)));

      const token = url.searchParams.get('accessToken') || '';

      const parseToken = String(token).replace(/\s/, '');

      const extractToken = this.accessToken.verify(parseToken);

      if (!extractToken) {
        socket.terminate();
        return;
      }

      this.server.clients.delete(socket);
      this.server.users.set(extractToken.id, socket);
      Object.assign(socket, { userId: extractToken.id });
      this.server.clients.add(socket);

      callback(...[socket, request]);
    });
  }
}
