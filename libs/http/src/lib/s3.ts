import {
  CopyObjectCommand, CopyObjectCommandInput,
  DeleteObjectCommand, DeleteObjectCommandInput,
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

  static async copyObject(input: CopyObjectCommandInput) {
    return await s3Client.send(new CopyObjectCommand(input));
  }

  static async moveObject(
      input: DeleteObjectCommandInput,
      from: string,
      to: string,
  ) {
    await this.copyObject({
      ...input,
      CopySource: from,
      Key: to,
    });
    await this.deleteObject(input);
  }

  static async deleteObject(input: DeleteObjectCommandInput) {
    return await s3Client.send(new DeleteObjectCommand(input));
  }
}
