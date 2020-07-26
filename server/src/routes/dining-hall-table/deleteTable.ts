import type { HTTPRawHandler } from 'routes/handler';

import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/dining-hall-table/deleteTable.is';

const _handler: HTTPRawHandler = async ({ pathParameters: { tableName } }) => {
  console.log(tableName);
  return {
    message: 'Success!',
  };
};

export const handler = middyfy(_handler, InputSchema);
