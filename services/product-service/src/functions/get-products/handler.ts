import { errorMessage, loggers } from '@libs/http/logger';
import ProductService from '../../services/product.service';
import {
  formatErrorResponse,
  formatJSONResponse,
} from '@libs/http/api-gateway';
import { middyfy } from '@libs/http/lambda';

const { LOG, ERROR } = loggers('getProducts');

export const getProducts = async () => {
  try {
    LOG(`Getting all products`);
    const products = await ProductService.getProducts();

    return formatJSONResponse(products);
  } catch (err) {
    const message = errorMessage(err);
    ERROR(message);
    return formatErrorResponse(500, message);
  }
};

export const main = middyfy(getProducts);
