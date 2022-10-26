import middy from "@middy/core"
import bodyParser from "@middy/http-json-body-parser";
import cors from "@middy/http-cors";
import httpErrorHandler from "@middy/http-error-handler";

export const middyfy = (handler) => {
  return middy(handler)
    .use(bodyParser())
    .use(cors({origin: "*", methods: "*", requestMethods: "*"}))
    .use(httpErrorHandler());
}
