import {handlerPath} from '../../../../../libs/http/src/lib/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        batchSize: 5,
        arn: {
          'Fn::GetAtt': ['SQSQueue', 'Arn'],
        },
      },
    },
  ],
};
