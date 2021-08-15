import { NestFactory } from '@nestjs/core';
import { ShutdownSignal } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WsAdapter } from './ws.adapter';
import { AccessToken } from './providers/access-token/access-token';

const shutdownSignals = [
  ShutdownSignal.SIGINT,
  ShutdownSignal.SIGTERM,
  ShutdownSignal.SIGQUIT,
];

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    },
  );

  app.useLogger(['debug', 'error', 'log', 'verbose', 'warn']);

  const environment = app.get(ConfigService);
  const accessToken = app.get(AccessToken);
  app.useWebSocketAdapter(
    new WsAdapter(app, environment.get<number>('port') as number, accessToken),
  );

  await app.enableShutdownHooks(shutdownSignals).listen();
}

bootstrap();
