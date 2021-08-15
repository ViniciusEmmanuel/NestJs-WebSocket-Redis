import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessToken } from './access-token';

@Module({
  imports: [JwtModule.register({})],
  providers: [AccessToken],
  exports: [AccessToken],
})
export class AccessTokenModule {}
