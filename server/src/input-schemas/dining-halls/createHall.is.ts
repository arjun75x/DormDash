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
      required: ['DiningHallName', 'Latitude', 'Longitude'],
      properties: {
        DiningHallName: {
          type: 'string',
        },
        Latitude: {
          type: 'string',
        },
        Longitude: {
          type: 'string',
        },
      },
    },
  },
};
