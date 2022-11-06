import {errorMessage, Logger} from '@libs/http/logger';
import ProductService from '../../services/product.service';
import {
  formatErrorResponse,
  formatJSONResponse,
} from '@libs/http/api-gateway';
import {middyfy} from '@libs/http/lambda';

const logger = new Logger('getProducts');

export const getProducts = async () => {
  try {
    logger.log('Getting all products');
    const products = await ProductService.getProducts();

    return formatJSONResponse(products);
  } catch (err) {
    const message = errorMessage(err);
    logger.error(message);
    return formatErrorResponse(500, message);
  }
};

export const main = middyfy(getProducts);
