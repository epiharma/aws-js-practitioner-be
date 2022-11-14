import {errorMessage, Logger} from '@libs/http/logger';
import ProductService from '../../services/product.service';
import {
  formatJSONResponse,
} from '@libs/http/api-gateway';
import {middyfy} from '@libs/http/lambda';

import {SQSEvent} from 'aws-lambda';
import {snsConfig} from '@environments/sqs.config';
import {sns} from '@libs/http/sqs';

const logger = new Logger('catalogBatchProcess');

export const catalogBatchProcess = async (event: SQSEvent) => {
  try {
    const importedProducts = [];

    for (const item of event.Records) {
      const payload = JSON.parse(item.body);
      logger.log(`Creating product from payload: ${JSON.stringify(payload)}`);

      const createdProduct = await ProductService.createProduct(payload);
      logger.log(`Created product: ${JSON.stringify(createdProduct, null, 2)}`);

      importedProducts.push(createdProduct);
    }

    const publishMessage = {
      TopicArn: snsConfig.TOPIC_ARN,
      Subject: '[AWS JS Practitioner #3]: task 6 / imported products',
      Message: JSON.stringify(importedProducts, null, 2),
    };

    await sns.publish(publishMessage).promise();
  } catch (e) {
    const message = errorMessage(e);
    logger.error(message);
    return formatJSONResponse({message});
  }
};

export const main = middyfy(catalogBatchProcess);
