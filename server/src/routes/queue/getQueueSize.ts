import type { HTTPRawHandler } from 'routes/handler';

import { getQueueSize } from 'models/QueueInfo';
import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/test.is';

const _handler: HTTPRawHandler = async ({
  queryStringParameters: { DiningHallName },
}) => {
  console.log('fdjskal', { DiningHallName });
  const queueSize = await getQueueSize(DiningHallName);

  return {
    message: 'Success!',
    queueSize,
  };
};

export const handler = middyfy(_handler, InputSchema);
