import {formatErrorResponse, formatJSONResponse} from "@libs/api-gateway";
import {middyfy} from "@libs/lambda";
import {errorMessage, loggers} from "@libs/logger";
import ProductService from "@services/product.service";

const {LOG, ERROR} = loggers("getProducts");

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
