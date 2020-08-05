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
      required: ['NetID', 'leaveTime'],
      properties: {
        NetID: {
          type: 'string',
        },
        leaveTime: {
          type: 'string',
        },
      },
    },
  },
};
