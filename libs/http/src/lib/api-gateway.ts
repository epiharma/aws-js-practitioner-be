import {APIGatewayAuthorizerResult} from 'aws-lambda';

export const formatJSONResponse = (response) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
};

export const formatErrorResponse = (statusCode: number, message: string) => {
  return {
    statusCode,
    message,
  };
};

export enum EffectsEnum {
  ALLOW = 'Allow',
  DENY = 'Deny',
}

export const generatePolicy = (
    principalId,
    resource,
    effect = EffectsEnum.ALLOW,
): APIGatewayAuthorizerResult => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
};
