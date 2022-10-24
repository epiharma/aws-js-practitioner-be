import {formatErrorResponse, formatJSONResponse} from "@libs/api-gateway";
import {middyfy} from "@libs/lambda";
import {errorMessage, loggers} from "@libs/logger";
import {APIGatewayEvent} from "aws-lambda";
import ProductService from "@services/product.service";

const {LOG, ERROR} = loggers("getProductById");

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
