export interface Environment {
  name: 'dev' | 'prod';
  region: string;
  profile: string;
  jwtSecret: string;
  dynamo: DynamoTableInfo[];
}

interface DynamoTableInfo {
  endpoint?: string;
  tableName: string;
}
