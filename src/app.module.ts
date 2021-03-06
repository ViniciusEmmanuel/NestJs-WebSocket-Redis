import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { environment } from '@config/environment';
import { AccessTokenModule } from './providers/access-token/access-token.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [environment] }),
    EventEmitterModule.forRoot(),
    AccessTokenModule,
  ],
})
export class AppModule {}
