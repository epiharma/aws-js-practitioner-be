import {Product} from '../models/product';
import DB from '@libs/http/db';
import {v4 as uuid} from 'uuid';
import {dynamoDbConfig} from '@environments/dynamo-db.config';

export default class ProductService {
  static async getProductById(id: string): Promise<Product> {
    const product = (
      await DB.query(dynamoDbConfig.PRODUCT_TABLE_NAME, {
        KeyConditionExpression: `id = :id`,
        ExpressionAttributeValues: {[`:id`]: id},
      })
    )?.Items?.[0];
    const productStock = (
      await DB.query(dynamoDbConfig.STOCK_TABLE_NAME, {
        KeyConditionExpression: `product_id = :id`,
        ExpressionAttributeValues: {[`:id`]: id},
      })
    )?.Items?.[0];

    return {...product, count: productStock.count};
  }

  static async getProducts(): Promise<Product[]> {
    const products = await DB.scan(dynamoDbConfig.PRODUCT_TABLE_NAME);
    const stocks = await DB.scan(dynamoDbConfig.STOCK_TABLE_NAME);

    return products.map((product, index) => ({
      ...product,
      count: stocks[index],
    }));
  }

  static async createProduct(payload: Partial<Product>): Promise<Product> {
    const id = uuid();
    const product = {id, ...payload} as Product;
    const productStock = {product_id: id, count: product.count};

    await DB.put(dynamoDbConfig.PRODUCT_TABLE_NAME, product);
    await DB.put(dynamoDbConfig.STOCK_TABLE_NAME, productStock);

    return product;
  }
}
