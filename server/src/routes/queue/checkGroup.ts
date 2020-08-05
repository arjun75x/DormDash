import type { HTTPRawHandler } from 'routes/handler';

import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/queue/checkGroup.is';
import { checkGroup } from 'models/QueueRequest';
import { checkIfEating, checkIfAdmitted } from 'models/AdmittedEntry';

const _handler: HTTPRawHandler = async ({ queryStringParameters: { NetID } }) => {
  const eatingRequest = await checkIfEating(NetID);
  if (eatingRequest) {
    return { message: 'Success!', eating: true };
  }

  const admittedEntry = await checkIfAdmitted(NetID);
  if (admittedEntry) {
    return {
      message: 'Success!',
      admittedEntry,
    };
  }

  const queueRequest = await checkGroup(NetID);
  if (queueRequest) {
    return {
      message: 'Success!',
      queueRequest,
    };
  }

  return { message: 'Not in a group!' };
};

export const handler = middyfy(_handler, InputSchema);
