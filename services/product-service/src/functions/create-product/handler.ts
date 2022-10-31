import { errorMessage, loggers } from '@libs/http/logger';
import { APIGatewayEvent } from 'aws-lambda';
import { Product } from '../../models/product';
import ProductService from '../../services/product.service';
import {
  formatErrorResponse,
  formatJSONResponse,
} from '@libs/http/api-gateway';
import { middyfy } from '@libs/http/lambda';

const { LOG, ERROR } = loggers('createProduct');

const createProduct = async (event: APIGatewayEvent) => {
  try {
    const payload = event.body as Partial<Product>;
    LOG(`Creating product ${JSON.stringify(payload)}`);

    const product = await ProductService.createProduct(payload);

    return formatJSONResponse({ product });
  } catch (err) {
    const message = errorMessage(err);
    ERROR(message);
    return formatErrorResponse(500, message);
  }
};

export const main = middyfy(createProduct);
