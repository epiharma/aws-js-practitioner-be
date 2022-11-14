import {EffectsEnum} from '@libs/http/api-gateway';

export class AuthorizationService {
  static getUserCredentialsFromToken(token: string): any {
    const encodedCredentials = token.split(' ')[1];
    const buff = Buffer.from(encodedCredentials, 'base64');
    const [username, password] = buff.toString('utf-8').split(':');

    return {
      username,
      password,
    };
  }

  static calculatePolicyEffect({username, password}): any {
    const passwordFromEnv = process.env[username];

    if (passwordFromEnv && passwordFromEnv === password) {
      return EffectsEnum.ALLOW;
    }

    return EffectsEnum.DENY;
  }
}
