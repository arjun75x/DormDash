import type { HTTPRawHandler } from 'routes/handler';

import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/admit/leaveHall.is';
import { leaveHall } from 'models/AdmittedEntry';

const _handler: HTTPRawHandler = async ({ body: { NetID } }) => {
  await leaveHall(NetID);

  return {
    message: 'Goodbye!',
  };
};

export const handler = middyfy(_handler, InputSchema);
