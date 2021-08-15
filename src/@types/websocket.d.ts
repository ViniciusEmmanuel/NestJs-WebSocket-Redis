import * as ws from 'ws';

export type WsServer = ws.Server;

declare module 'ws' {
  export interface WebSocket extends ws {
    userId: string;
  }

  export interface Server extends ws {
    users: Map<string, WebSocket>;
  }
}
