import type { HTTPRawHandler } from 'routes/handler';

import { retrainRecommendation } from 'models/RecommendationSystem';
import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/test.is';

const _handler: HTTPRawHandler = async () => {
  await retrainRecommendation();

  return {
    message: 'Success!',
  };
};

export const handler = middyfy(_handler, InputSchema);