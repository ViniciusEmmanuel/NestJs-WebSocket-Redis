import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import IAccessTokenService, {
  IVerify,
  IToken,
} from '../interfaces/IAccessTokenService';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccessToken implements IAccessTokenService {
  private readonly hashEncode: string;

  private provider: JwtService;

  constructor(configService: ConfigService, jwtService: JwtService) {
    const jwtHash = configService.get('JWT_HASH');
    if (!jwtHash) throw new Error('Hash não definida no arquivo .env');

    this.provider = jwtService;
    this.hashEncode = jwtHash;
  }

  verify(token: string): IVerify | null {
    try {
      const { sub } = this.provider.verify(token, {
        secret: this.hashEncode,
        algorithms: ['HS256'],
      }) as IToken;

      return { id: sub };
    } catch (error) {
      return null;
    }
  }

  decode(token: string): IVerify | null {
    const tokenProperties = this.provider.decode(token) as IToken;

    return tokenProperties ? { id: tokenProperties.sub } : null;
  }
}
