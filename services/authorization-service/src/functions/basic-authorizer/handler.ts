import {APIGatewayTokenAuthorizerHandler} from 'aws-lambda';
import {EffectsEnum, generatePolicy} from '@libs/http/api-gateway';
import {middyfy} from '@libs/http/lambda';
import {AuthorizationService} from '../../services/authorization.service';

export const basicAuthorizerHandler: APIGatewayTokenAuthorizerHandler = async ({
  type,
  authorizationToken,
  methodArn,
}) => {
  try {
    if (type !== 'TOKEN') {
      return generatePolicy(authorizationToken, methodArn, EffectsEnum.DENY);
    }

    const credentials = AuthorizationService.getUserCredentialsFromToken(authorizationToken);
    const effect = AuthorizationService.calculatePolicyEffect(credentials);

    return generatePolicy(authorizationToken, methodArn, effect);
  } catch (e) {
    return generatePolicy(authorizationToken, methodArn, EffectsEnum.DENY);
  }
};

export const main = middyfy(basicAuthorizerHandler);
