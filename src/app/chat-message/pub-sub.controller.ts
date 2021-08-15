import { Controller } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EEvent } from '@shared/enum/EEvent';
import { EPubSubMessage } from '@shared/enum/EPubSubMessage';

@Controller()
export class PubSubController {
  constructor(private eventEmitter: EventEmitter2) {}

  @MessagePattern(EPubSubMessage.NOTIFICATION_CHAT_MESSAGE)
  NotificationChatMessage(@Payload() data: string) {
    this.eventEmitter.emit(EEvent.NEW_CHAT_MESSAGE, { message: data });
  }
}
