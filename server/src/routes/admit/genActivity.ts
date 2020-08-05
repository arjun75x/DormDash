import type { HTTPRawHandler } from 'routes/handler';

import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/test.is';
import { genActivity } from 'models/AdmittedEntry';

const _handler: HTTPRawHandler = async () => {
  await genActivity();

  return {
    message: 'Success!',
  };
};

export const handler = middyfy(_handler, InputSchema);
