import type { HTTPRawHandler } from 'routes/handler';

import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/queue/checkGroup.is';
import { checkGroup } from 'models/QueueRequest';

const _handler: HTTPRawHandler = async ({ body: { DiningHallName, QueueGroup } }) => {
    const queueRequest = await checkGroup(DiningHallName, QueueGroup);
  
    return {
      message: 'Success!',
      queueRequest: queueRequest,
    };
  };
  
  export const handler = middyfy(_handler, InputSchema);