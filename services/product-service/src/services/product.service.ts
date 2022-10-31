import { Product } from '../models/product';
import { DynamoDbTableNames } from '../../../../environments/dynamo-db-table-names';
import DB from '../libs/db';
import { v4 as uuid } from 'uuid';

export default class ProductService {
  static async getProductById(id: string): Promise<Product> {
    const product = (
      await DB.query(DynamoDbTableNames.Products, {
        KeyConditionExpression: `id = :id`,
        ExpressionAttributeValues: { [`:id`]: id },
      })
    )?.Items?.[0];
    const productStock = (
      await DB.query(DynamoDbTableNames.Stocks, {
        KeyConditionExpression: `product_id = :id`,
        ExpressionAttributeValues: { [`:id`]: id },
      })
    )?.Items?.[0];

    return { ...product, count: productStock.count };
  }

  static async getProducts(): Promise<Product[]> {
    const products = await DB.scan(DynamoDbTableNames.Products);
    const stocks = await DB.scan(DynamoDbTableNames.Stocks);

    return products.map((product, index) => ({
      ...product,
      count: stocks[index],
    }));
  }

  static async createProduct(payload: Partial<Product>): Promise<Product> {
    const id = uuid();
    const product = { id, ...payload } as Product;
    const productStock = { product_id: id, count: product.count };

    await DB.put(DynamoDbTableNames.Products, product);
    await DB.put(DynamoDbTableNames.Stocks, productStock);

    return product;
  }
}
