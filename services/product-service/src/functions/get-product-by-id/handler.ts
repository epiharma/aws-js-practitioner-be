import { errorMessage, loggers } from '@libs/http/logger';
import { APIGatewayEvent } from 'aws-lambda';
import ProductService from '../../services/product.service';
import {
  formatErrorResponse,
  formatJSONResponse,
} from '@libs/http/api-gateway';
import { middyfy } from '@libs/http/lambda';

const { LOG, ERROR } = loggers('getProductById');

export const getProductById = async (event: APIGatewayEvent) => {
  try {
    const id = String(event.pathParameters.id);

    LOG(`Looking for product with ID ${id}`);

    const product = await ProductService.getProductById(id);

    return formatJSONResponse({
      product,
    });
  } catch (err) {
    const message = errorMessage(err);
    ERROR(message);
    return formatErrorResponse(500, message);
  }
};

export const main = middyfy(getProductById);
