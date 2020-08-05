import type { HTTPRawHandler } from 'routes/handler';

import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/admit/attemptAdmit.is';
import { getActivity } from 'models/AdmittedEntry';

const _handler: HTTPRawHandler = async () => {
  return {
    message: 'Success!',
  };
};

export const handler = middyfy(_handler, InputSchema);
