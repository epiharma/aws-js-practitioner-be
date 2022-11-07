import type {AWS} from '@serverless/typescript';
import * as functions from './src/functions';
import {snsConfig, sqsConfig} from '../../environments/sqs.config';
import {dynamoDbConfig} from '../../environments/dynamo-db.config';

const serverlessConfiguration: AWS = {
  service: 'product-services',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
            ],
            Resource: `arn:aws:dynamodb:${dynamoDbConfig.REGION}:*:table/${dynamoDbConfig.PRODUCT_TABLE_NAME}`,
          },
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
            ],
            Resource: `arn:aws:dynamodb:${dynamoDbConfig.REGION}:*:table/${dynamoDbConfig.STOCK_TABLE_NAME}`,
          },
          {
            Effect: 'Allow',
            Action: 'sqs:*',
            Resource: [{'Fn::GetAtt': ['SQSQueue', 'Arn']}],
          },
          {
            Effect: 'Allow',
            Action: 'sns:*',
            Resource: [{Ref: 'SNSTopic'}],
          },
        ],
      },
    },
  },
  functions,
  package: {individually: true},
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: {'require.resolve': undefined},
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {QueueName: sqsConfig.QUEUE_NAME},
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {TopicName: snsConfig.TOPIC_NAME},
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: snsConfig.SUBSCRIPTION_EMAIL,
          Protocol: 'email',
          TopicArn: {Ref: 'SNSTopic'},
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
