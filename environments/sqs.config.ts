export const sqsConfig = {
  REGION: process.env.SQS_REGION ?? 'us-east-1',
  QUEUE_URL: process.env.SQS_URL ?? 'https://sqs.us-east-1.amazonaws.com/625628081238/catalogItemsQueue',
  QUEUE_ARN: process.env.SQS_ARN ?? 'arn:aws:sqs:us-east-1:625628081238:catalogItemsQueue',
  QUEUE_NAME: process.env.QUEUE_NAME ?? 'catalogItemsQueue',
}

export const snsConfig = {
  REGION: process.env.SNS_REGION ?? 'us-east-1',
  TOPIC_NAME: process.env.TOPIC_NAME ?? 'createProductTopic',
  TOPIC_ARN: process.env.SNS_TOPIC_ARN ?? 'arn:aws:sns:us-east-1:625628081238:createProductTopic',
  SUBSCRIPTION_EMAIL: process.env.SNS_SUBSCRIPTION_EMAIL ?? 'epiharma@gmail.com',
}
