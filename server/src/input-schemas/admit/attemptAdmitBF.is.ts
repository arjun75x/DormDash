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
      required: ['NetID', 'admitTime'],
      properties: {
        NetID: {
          type: 'string',
        },
        admitTime: {
          type: 'string',
        },
      },
    },
  },
};
