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
        required: ['DiningHallName', 'QueueGroup', 'joinTime'],
        properties: {
          DiningHallName: {
            type: 'string',
          },
          QueueGroup: {
            type: 'array',
          },
          joinTime: {
              type: 'string'
          },

        },
      },
    },
  };
  