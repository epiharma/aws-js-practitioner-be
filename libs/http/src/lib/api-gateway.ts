export const formatJSONResponse = (response: Record<string, unknown> | any) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
};

export const formatErrorResponse = (statusCode: number, message: string) => {
  return {
    statusCode,
    message,
  };
};
