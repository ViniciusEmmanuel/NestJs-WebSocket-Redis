import { NestFactory } from '@nestjs/core';
import { ShutdownSignal } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { RedisOptions, Transport } from '@nestjs/microservices';

const shutdownSignals = [
  ShutdownSignal.SIGINT,
  ShutdownSignal.SIGTERM,
  ShutdownSignal.SIGQUIT,
];

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  const environment = app.get(ConfigService);

  app.useLogger(['debug', 'error', 'log', 'verbose', 'warn']);
  app.useWebSocketAdapter(new WsAdapter(app));

  app.connectMicroservice<RedisOptions>({
    transport: Transport.REDIS,
    options: {
      host: environment.get('redis.host'),
      port: environment.get('redis.port'),
    },
  });
  await app.startAllMicroservices();

  await app
    .enableShutdownHooks(shutdownSignals)
    .listen(environment.get('port'));
}

bootstrap();
