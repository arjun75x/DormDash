import type { HTTPRawHandler } from 'routes/handler';

import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/admit/leaveHallBF.is';
import { leaveHallBF } from 'models/AdmittedEntry';

const _handler: HTTPRawHandler = async ({ body: { NetID, leaveTime } }) => {
  await leaveHallBF(NetID, leaveTime);

  return {
    message: 'Goodbye!',
  };
};

export const handler = middyfy(_handler, InputSchema);
