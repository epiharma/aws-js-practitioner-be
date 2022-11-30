export const s3BucketConfig = {
  UPLOADED_FOLDER: process.env['S3_UPLOADED_FOLDER'] ?? 'uploaded',
  PARSED_FOLDER: process.env['S3_PARSED_FOLDER'] ?? 'parsed',
  BUCKET_NAME: process.env['S3_BUCKET_NAME'] ?? 'task-5-bucket',
  SIGNATURE_LIFESPAN: process.env['S3_SIGNATURE_LIFESPAN'] ?? 60,
  REGION: process.env['S3_REGION'] ?? 'us-east-1',
};
