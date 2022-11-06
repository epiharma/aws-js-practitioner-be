import {APIGatewayEvent} from 'aws-lambda';
import {errorMessage, Logger} from '@libs/http/logger';
import {middyfy} from '@libs/http/lambda';
import {
  formatErrorResponse,
  formatJSONResponse,
} from '@libs/http/api-gateway';
import ImportService from '../../services/import.service';

const logger = new Logger('importProductsFile');

export const importProductsFile = async (
    event: Pick<APIGatewayEvent, 'queryStringParameters'>,
) => {
  try {
    const {name: filename} = event.queryStringParameters;

    if (!filename) {
      const message = 'Missing name query parameter';
      logger.error(message);
      return formatErrorResponse(400, message);
    }

    logger.log('Creating signed url');
    const signedUrl = await ImportService.getSignedUrl(filename);
    logger.log(`Created signed url: ${signedUrl}`);
    return formatJSONResponse(signedUrl);
  } catch (e) {
    const message = errorMessage(e);
    logger.error(message);
    return formatErrorResponse(500, message);
  }
};

export const main = middyfy(importProductsFile);
