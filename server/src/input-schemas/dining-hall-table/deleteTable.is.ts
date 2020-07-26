export default {
  type: 'object',
  required: ['headers', 'pathParameters'],
  properties: {
    headers: {
      type: 'object',
      properties: {
        Authorization: {
          type: 'string',
        },
      },
    },
    pathParameters: {
      type: 'object',
      required: ['tableName'],
      properties: {
        tableName: {
          type: 'string',
        },
      },
    },
  },
};
