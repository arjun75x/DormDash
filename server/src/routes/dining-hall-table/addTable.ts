import type { HTTPRawHandler } from 'routes/handler';

import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/dining-hall-table/addTable.is';
import { createDiningHallTable } from 'models/DiningHallTable';

const _handler: HTTPRawHandler = async ({ body: { DiningHallName, Capacity } }) => {
  await createDiningHallTable(DiningHallName, Capacity);
  return {
    message: 'Success!',
  };
};

export const handler = middyfy(_handler, InputSchema);
