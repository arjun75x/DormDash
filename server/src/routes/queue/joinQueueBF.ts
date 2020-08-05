import type { HTTPRawHandler } from 'routes/handler';

import { joinQueueBF } from 'models/QueueRequest';
import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/queue/joinQueueBF.is';

const _handler: HTTPRawHandler = async ({
  body: { DiningHallName, QueueGroup, joinTime },
}) => {
  const queueRequest = await joinQueueBF(DiningHallName, QueueGroup, joinTime);

  return {
    message: 'Success!',
    queueRequest: queueRequest,
  };
};

export const handler = middyfy(_handler, InputSchema);
