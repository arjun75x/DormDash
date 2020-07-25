export const authorizerInputSchema = {
  type: 'object',
  required: ['authorizationToken', 'methodArn'],
  properties: {
    authorizationToken: {
      type: 'string',
    },
    methodArn: {
      type: 'string',
    },
  },
};
