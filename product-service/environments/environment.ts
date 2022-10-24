import type {Environment} from "./environment.types";

export const env: Environment = {
  name: "dev",
  profile: process.env.PROFILE || "local",
  jwtSecret: process.env.SECRET || "<SECRET>",
  dynamo: [
    {
      tableName: process.env.PRODUCT_TABLE_NAME,
      endpoint: process.env.PRODUCT_TABLE_ENDPOINT,
    },
    {
      tableName: process.env.STOCK_TABLE_NAME,
      endpoint: process.env.STOCK_TABLE_ENDPOINT,
    },
  ],
  region: process.env.REGION || "us-east-1",
};
