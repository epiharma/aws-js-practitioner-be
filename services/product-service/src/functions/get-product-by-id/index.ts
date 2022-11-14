import {handlerPath} from '../../../../../libs/http/src/lib/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{id}',
      },
    },
  ],
};
