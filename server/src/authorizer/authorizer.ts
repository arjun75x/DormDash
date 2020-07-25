import type { Token } from 'utils/auth';
import type { User } from 'models/User';

import {
  APIGatewayTokenAuthorizerWithContextHandler,
  APIGatewayAuthorizerWithContextResult,
} from 'aws-lambda';

import authMiddyfy from 'authorizer/middleware/wrapper';
import { authorizerInputSchema } from 'authorizer/authorizer.is';

import { decodeBasicAuthHeader, validateTokenAndReturnUser } from 'utils/auth';

const generatePolicy = (
  principalId: string,
  methodArn: string,
  effect: 'Allow' | 'Deny',
  user: User
): APIGatewayAuthorizerWithContextResult<User> => {
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

const _handler: APIGatewayTokenAuthorizerWithContextHandler<User> = async (
  event,
  context
) => {
  const token: Token = decodeBasicAuthHeader(event.authorizationToken);
  const user = await validateTokenAndReturnUser(token);

  if (user !== null) {
    return generatePolicy(user.NetId, event.methodArn, 'Allow', user);
  } else {
    context.fail('Unauthorized');
  }
};

export const handler = authMiddyfy(_handler, authorizerInputSchema);
