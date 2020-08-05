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
        required: ['NetID', 'arriveTime'],
        properties: {
          NetID: {
            type: 'string',
          },
          arriveTime: {
              type: 'string'
          }
        },
      },
    },
  };
  