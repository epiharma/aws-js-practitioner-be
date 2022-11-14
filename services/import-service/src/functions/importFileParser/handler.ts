import {S3Event} from 'aws-lambda';
import {errorMessage, Logger} from '@libs/http/logger';
import {S3} from '@libs/http/s3';
import ImportService from '../../services/import.service';
import {sqs} from '@libs/http/sqs';
import {s3BucketConfig} from '@environments/s3-bucket.config';
import {sqsConfig} from '@environments/sqs.config';

const logger = new Logger('importFileParser');

const importFileParser = async (event: S3Event) => {
  try {
    for (const record of event.Records) {
      const {object, bucket} = record.s3;
      const input = {
        Bucket: bucket.name,
        Key: object.key,
      };

      logger.log('Parsing csv stream');

      const {Body: csvStream} = await S3.getObject(input);
      const records = await ImportService.parseCsvStream(csvStream as any);

      for (const record of records) {
        const sqsRequest = {
          QueueUrl: sqsConfig.QUEUE_URL,
          MessageBody: JSON.stringify(record),
        };
        await sqs.sendMessage(sqsRequest).promise();
      }

      logger.log(`Moving file to parsed folder`);

      await S3.moveObject(
          input,
          `${bucket.name}/${object.key}`,
          object.key.replace(
              s3BucketConfig.UPLOADED_FOLDER,
              s3BucketConfig.PARSED_FOLDER,
          ),
      );

      logger.log(`File successfully moved to the folder`);
    }
  } catch (e) {
    const message = errorMessage(e);
    logger.error(message);
  }
};

export const main = importFileParser;
