import type { HTTPRawHandler } from 'routes/handler';

import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/queue/checkGroup.is';
import { checkGroup } from 'models/QueueRequest';
import { checkIfEating } from 'models/AdmittedEntry';

const _handler: HTTPRawHandler = async ({ queryStringParameters: { NetID } }) => {
  const eatingRequest = await checkIfEating(NetID);
  if (eatingRequest) {
    return { message: 'Success!', eating: true };
  }

  const queueRequest = await checkGroup(NetID);

  return {
    message: queueRequest == null ? 'Not in a group!' : 'Success!',
    queueRequest: queueRequest,
  };
};

export const handler = middyfy(_handler, InputSchema);
