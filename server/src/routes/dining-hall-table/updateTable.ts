import type { HTTPRawHandler } from 'routes/handler';

import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/dining-hall-table/updateTable.is';
import { updateDiningHallTable } from 'models/DiningHallTable';

const _handler: HTTPRawHandler = async ({ body: { TableID, Capacity } }) => {
  await updateDiningHallTable(TableID, Capacity);
  return {
    message: 'Success!',
  };
};

export const handler = middyfy(_handler, InputSchema);
