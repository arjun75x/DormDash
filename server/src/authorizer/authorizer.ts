import type { Token } from 'utils/auth';

import {
  APIGatewayTokenAuthorizerWithContextHandler,
  APIGatewayAuthorizerWithContextResult,
} from 'aws-lambda';

import authMiddyfy from 'authorizer/middleware/wrapper';
import { authorizerInputSchema } from 'authorizer/authorizer.is';

import { decodeBasicAuthHeader } from 'utils/auth';

const generatePolicy = (
  principalId: string,
  methodArn: string,
  effect: 'Allow' | 'Deny',
  user?: null
): APIGatewayAuthorizerWithContextResult<null> => {
  return {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: methodArn,
        },
      ],
    },
    context: user,
  };
};

const _handler: APIGatewayTokenAuthorizerWithContextHandler<null> = async (
  event,
  context
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const token: Token = decodeBasicAuthHeader(event.authorizationToken);
  const user = null;

  if (user !== null) {
    return generatePolicy(user.username, event.methodArn, 'Allow', user);
  } else {
    context.fail('Unauthorized');
  }
};

export const handler = authMiddyfy(_handler, authorizerInputSchema);
