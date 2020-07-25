import type { HTTPRawHandler } from 'routes/handler';

import { getDiningHalls } from 'models/DiningHall';
import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/test.is';

const _handler: HTTPRawHandler = async () => {
  const diningHalls = await getDiningHalls();

  return {
    message: 'Success!',
    diningHalls: diningHalls,
  };
};

export const handler = middyfy(_handler, InputSchema);
