import {handlerPath} from '../../../../../libs/http/src/lib/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        request: {
          parameters: {
            querystrings: {
              name: true,
            },
          },
        },
        authorizer: {
          arn: {
            'Fn::Sub':
              'arn:aws:lambda:${AWS::Region}:${AWS::AccountId}:function:authorization-service-dev-basicAuthorizer',
          },
          name: 'basicAuthorizer',
          type: 'TOKEN',
          identitySource: 'method.request.header.Authorization',
        },
      },
    },
  ],
};
