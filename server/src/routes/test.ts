import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/test.is';
import { HTTPRawHandler } from './handler';

const _handler: HTTPRawHandler = async () => {
  return {
    message: 'Success!',
  };
};

export const handler = middyfy(_handler, InputSchema);
