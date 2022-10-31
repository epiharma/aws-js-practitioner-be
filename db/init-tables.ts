import * as AWS from 'aws-sdk';
import { DynamoDbTableNames } from '../environments/dynamo-db-table-names';
import { Product } from '../services/product-service/src/models/product';
import { products } from '../services/product-service/src/mocks/data.mock';

const db = new AWS.DynamoDB();

const generateParamsForProduct = (item: Product) => ({
  TableName: DynamoDbTableNames.Products,
  Item: {
    id: { S: item.id },
    title: { S: item.title },
    description: { S: item.description },
    price: { N: `${item.price}` },
  },
});

const generateParamsForStocks = (item: Product) => ({
  TableName: DynamoDbTableNames.Stocks,
  Item: {
    product_id: { S: item.id },
    count: { N: `${item.count}` },
  },
});

const post = (params) => {
  db.putItem(params, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data);
    }
  });
};

const fillTables = async () => {
  products.forEach((product) => {
    post(generateParamsForProduct(product));
    post(generateParamsForStocks(product));
  });
};

fillTables();
