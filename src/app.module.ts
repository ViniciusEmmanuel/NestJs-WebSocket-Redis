import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { environment } from './config/environment';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [environment] }),
    EventEmitterModule.forRoot(),
  ],
})
export class AppModule {}
