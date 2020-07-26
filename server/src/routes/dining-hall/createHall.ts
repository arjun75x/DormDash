import type { HTTPRawHandler } from 'routes/handler';

import { createDiningHall } from 'models/DiningHall';
import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/dining-halls/createHall.is';

const _handler: HTTPRawHandler = async ({
  body: { DiningHallName, Latitude, Longitude },
}) => {
  await createDiningHall(DiningHallName, Latitude, Longitude);

  return {
    message: 'Success!',
  };
};

export const handler = middyfy(_handler, InputSchema);
