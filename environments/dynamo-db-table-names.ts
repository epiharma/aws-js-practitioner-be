export const DynamoDbTableNames = {
  Products: process.env.PRODUCT_TABLE_NAME ?? 'products',
  Stocks: process.env.STOCK_TABLE_NAME ?? 'stocks',
};
