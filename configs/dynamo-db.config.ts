export const dynamoDbConfig = {
  PRODUCT_TABLE_NAME: process.env.PRODUCT_TABLE_NAME ?? 'products',
  STOCK_TABLE_NAME: process.env.STOCK_TABLE_NAME ?? 'stocks',
  REGION: process.env.DYNAMODB_REGION ?? 'us-east-1',
};
