import {handlerPath} from '../../../../../libs/http/src/lib/handler-resolver';
import {s3BucketConfig} from '../../../../../configs/s3-bucket.config';

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
