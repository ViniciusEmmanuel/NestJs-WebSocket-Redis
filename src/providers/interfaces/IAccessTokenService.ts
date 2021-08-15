export interface IToken {
  iat: number;
  exp: number;
  sub: string;
}

export interface IVerify {
  id: string;
  payload?: Record<string, unknown>;
}

export default interface IAccessTokenService {
  verify(token: string): IVerify | null;

  decode(token: string): IVerify | null;
}
