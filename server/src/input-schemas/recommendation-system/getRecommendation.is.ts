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
        required: ['Latitude', 'Longitude'],
        properties: {
          Latitude: {
            type: 'number',
          },
          Longitude: {
            type: 'number',
          },
        },
      },
    },
  };
  