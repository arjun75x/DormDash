import type { HTTPRawHandler } from 'routes/handler';

import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/admit/attemptAdmitBF.is';
import { attemptAdmitBF } from 'models/AdmittedEntry';

const _handler: HTTPRawHandler = async ({ body: { NetID, admitTime } }) => {
  const admittedEntry = await attemptAdmitBF(NetID, admitTime);

  return {
    message: admittedEntry == null ? 'Not yet!' : 'Success!',
    admittedEntry: admittedEntry,
  };
};

export const handler = middyfy(_handler, InputSchema);
