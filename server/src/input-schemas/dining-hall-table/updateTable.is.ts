export default {
  type: 'object',
  required: ['headers', 'body'],
  properties: {
    headers: {
      type: 'object',
      properties: {
        Authorization: {
          type: 'string',
        },
      },
    },
    body: {
      type: 'object',
      required: ['TableID', 'Capacity'],
      properties: {
        TableID: {
          type: 'number',
        },
        Capacity: {
          type: 'number',
        },
      },
    },
  },
};
