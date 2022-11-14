import {handlerPath} from '../../../../../libs/http/src/lib/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        request: {
          schemas: {
            'application/json': {
              type: 'object',
              properties: {
                count: {type: 'number'},
                description: {type: 'string'},
                price: {type: 'number'},
                title: {type: 'string'},
              },
              required: ['count', 'description', 'price', 'title'],
            },
          },
        },
      },
    },
  ],
};
