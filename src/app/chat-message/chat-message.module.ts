import { Module } from '@nestjs/common';
import { ChatMessageGateway } from './chat-message.gateway';
import { PubSubController } from './pub-sub.controller';

@Module({
  providers: [ChatMessageGateway],
  controllers: [PubSubController],
})
export class ChatMessageModule {}
