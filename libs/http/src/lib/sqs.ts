import SNS from 'aws-sdk/clients/sns';
import SQS from 'aws-sdk/clients/sqs';
import {snsConfig, sqsConfig} from '@environments/sqs.config';

export const sns = new SNS({region: snsConfig.REGION});
export const sqs = new SQS({region: sqsConfig.REGION});
