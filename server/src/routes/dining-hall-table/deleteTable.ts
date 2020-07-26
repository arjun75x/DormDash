import type { HTTPRawHandler } from 'routes/handler';

import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/dining-hall-table/deleteTable.is.ts';
import { deleteDiningHallTable } from 'models/DiningHallTable';

const _handler: HTTPRawHandler = async ({ body: { TableID } }) => {
  await deleteDiningHallTable(TableID);
  return {
    message: 'Success!',
  };
};

export const handler = middyfy(_handler, InputSchema);
