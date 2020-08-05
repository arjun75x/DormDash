import type { HTTPRawHandler } from 'routes/handler';

import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/admit/arriveAtHallBF.is';
import { arriveAtHallBF } from 'models/AdmittedEntry';

const _handler: HTTPRawHandler = async ({ body: { NetID, arriveTime } }) => {
  await arriveAtHallBF(NetID, arriveTime);

  return {
    message: 'Welcome!',
  };
};

export const handler = middyfy(_handler, InputSchema);
