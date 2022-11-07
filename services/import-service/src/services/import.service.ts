import {Readable} from 'stream';
import csvParser from 'csv-parser';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
import {s3BucketConfig} from '@environments/s3-bucket.config';
import {PutObjectCommand} from '@aws-sdk/client-s3';
import {s3Client} from '@libs/http/s3';

export default class ImportService {
  static async getSignedUrl(filename: string): Promise<any> {
    const importFile = new PutObjectCommand({
      Bucket: s3BucketConfig.BUCKET_NAME,
      Key: `${s3BucketConfig.UPLOADED_FOLDER}/${filename}`,
    });

    return await getSignedUrl(s3Client, importFile, {
      expiresIn: +s3BucketConfig.SIGNATURE_LIFESPAN,
    });
  }

  static async parseCsvStream(stream: Readable): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      const data = [];
      stream
          .pipe(csvParser())
          .on('error', reject)
          .on('data', (record) => {
            data.push(record);
          })
          .on('end', () => {
            resolve(data);
          });
    });
  }
}
