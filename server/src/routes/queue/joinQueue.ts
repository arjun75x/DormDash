import type { HTTPRawHandler } from 'routes/handler';

import { joinQueue } from 'models/QueueRequest';
import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/queue/joinQueue.is';

const _handler: HTTPRawHandler = async ({ body: { DiningHallName, QueueGroup } }) => {
  const queueRequest = await joinQueue(DiningHallName, QueueGroup);

  return {
    message: 'Success!',
    queueRequest: queueRequest,
  };
};

export const handler = middyfy(_handler, InputSchema);
