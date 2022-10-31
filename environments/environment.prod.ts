import type { Environment } from './environment.types';

export const env: Environment = {
  name: 'prod',
  profile: process.env.PROFILE || 'local',
  jwtSecret: process.env.SECRET || '<SECRET>',
  dynamo: [],
  region: process.env.REGION || 'us-east-1',
};
