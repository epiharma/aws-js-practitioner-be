import {handlerPath} from '@libs/http/handler-resolver';
import {s3BucketConfig} from '@environments/s3-bucket.config';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: s3BucketConfig.BUCKET_NAME,
        event: 's3:ObjectCreated:*',
        rules: [
          {
            prefix: `${s3BucketConfig.UPLOADED_FOLDER}/`,
          },
        ],
        existing: true,
      },
    },
  ],
};
