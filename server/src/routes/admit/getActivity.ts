import type { HTTPRawHandler } from 'routes/handler';

import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/admit/getActivity.is';
import { getActivity } from 'models/AdmittedEntry';

const _handler: HTTPRawHandler = async () => {
  const activity = await getActivity();

  return {
    message: 'Success!',
    activity: activity,
  };
};

export const handler = middyfy(_handler, InputSchema);
