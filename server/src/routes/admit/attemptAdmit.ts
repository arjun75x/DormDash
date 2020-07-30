import type { HTTPRawHandler } from 'routes/handler';

import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/admit/attemptAdmit.is';
import { attemptAdmit } from 'models/AdmittedEntry';

const _handler: HTTPRawHandler = async ({ body: { NetID } }) => {
  const admittedEntry = await attemptAdmit(NetID);

  return {
    message: admittedEntry == null ? 'Not yet!' : 'Success!',
    admittedEntry: admittedEntry,
  };
};

export const handler = middyfy(_handler, InputSchema);
