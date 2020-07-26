import type { HTTPRawHandler } from 'routes/handler';

import { deleteDiningHall } from 'models/DiningHall';
import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/dining-halls/deleteHall.is';

const _handler: HTTPRawHandler = async ({ body: { DiningHallName } }) => {
  await deleteDiningHall(DiningHallName);

  return {
    message: 'Success!',
  };
};

export const handler = middyfy(_handler, InputSchema);
