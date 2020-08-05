import type { HTTPRawHandler } from 'routes/handler';

import { leaveQueue } from 'models/QueueRequest';
import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/queue/leaveQueue.is';

const _handler: HTTPRawHandler = async ({ body: { NetID } }) => {
  await leaveQueue(NetID);

  return {
    message: 'Success!',
  };
};

export const handler = middyfy(_handler, InputSchema);
