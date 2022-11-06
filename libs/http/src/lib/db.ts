import * as AWS from 'aws-sdk';
import {dynamoDbConfig} from '@environments/dynamo-db.config';

const dynamo = new AWS.DynamoDB.DocumentClient({
  region: dynamoDbConfig.REGION,
});

class DB {
  static async scan(TableName: string): Promise<any> {
    const scanResults = await dynamo.scan({TableName}).promise();
    return scanResults.Items;
  }

  static async query(TableName: string, options = {}): Promise<any> {
    return await dynamo
        .query({
          TableName,
          ...options,
        })
        .promise();
  }

  static async put(TableName: string, Item = {}): Promise<any> {
    return await dynamo
        .put({
          TableName,
          Item,
        })
        .promise();
  }
}

export default DB;
