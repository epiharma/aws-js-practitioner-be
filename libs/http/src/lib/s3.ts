import {
  GetObjectCommand,
  GetObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import {s3BucketConfig} from '@environments/s3-bucket.config';

export const s3Client = new S3Client({region: s3BucketConfig.REGION});

export class S3 {
  static async getObject(input: GetObjectCommandInput) {
    return await s3Client.send(new GetObjectCommand(input));
  }
}
