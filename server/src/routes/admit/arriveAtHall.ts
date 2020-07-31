import type { HTTPRawHandler } from 'routes/handler';

import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/admit/arriveAtHall.is';
import { arriveAtHall } from 'models/AdmittedEntry';

const _handler: HTTPRawHandler = async ({ body: { NetID } }) => {
  await arriveAtHall(NetID);

  return {
    message: 'Welcome!',
  };
};

export const handler = middyfy(_handler, InputSchema);
