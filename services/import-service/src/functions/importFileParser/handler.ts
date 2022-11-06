import {S3Event} from 'aws-lambda';
import {errorMessage, Logger} from '@libs/http/logger';
import {S3} from '@libs/http/s3';
import ImportService from '../../services/import.service';

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

      logger.log(`Parsed data: ${JSON.stringify(records, null, 2)}`);
    }
  } catch (e) {
    const message = errorMessage(e);
    logger.error(message);
  }
};

export const main = importFileParser;
