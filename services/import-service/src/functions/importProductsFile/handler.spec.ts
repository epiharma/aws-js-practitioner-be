import {importProductsFile} from './handler';

(global.console as any) = {error: jest.fn(), log: jest.fn()};

describe('importProductsFile', () => {
  it('should return error if no name in query params', async () => {
    const result: any = await importProductsFile({queryStringParameters: {}});

    expect(result.statusCode).toEqual(400);
  });
});
