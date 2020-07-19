import { Handler } from 'aws-lambda';
import { HTTPRawHandler } from 'routes/handler';

import middy from '@middy/core';
import cors from '@middy/http-cors';
import jsonBodyParser from '@middy/http-json-body-parser';
import doNotWaitForEmptyEventLoop from '@middy/do-not-wait-for-empty-event-loop';

import validator from 'middleware/custom/validator';
import validatorErrorHandler from 'middleware/custom/validator-error-handler';
import errorHandler from 'middleware/custom/error-handler';

/** Wraps a Serverless api function handler with middleware from
 * the Middy framework.
 *
 * @param  {Function} handler The original Serverless handler function.
 * @param  {Object} inputSchema Optional. Event input schema to enforce.
 *
 * @return {Function} The Middy-fyed wrapped function handler.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (handler: HTTPRawHandler, inputSchema: object = null) => {
  const wrappedResponseHandler: Handler = async (...args) => {
    const res = await handler(...args);
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  };

  const middleware = middy(wrappedResponseHandler)
    .use(jsonBodyParser())
    .use(cors())
    .use(doNotWaitForEmptyEventLoop({ runOnBefore: true, runOnError: true }));

  if (inputSchema) {
    middleware.use(validator({ inputSchema, outputSchema: null, ajvOptions: null }));
  }

  middleware.use(validatorErrorHandler()).use(errorHandler());

  return middleware;
};
