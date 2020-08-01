import type { HTTPRawHandler } from 'routes/handler';

import { getRecommendation } from 'models/RecommendationSystem';
import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/recommendation-system/getRecommendation.is';

const _handler: HTTPRawHandler = async ({ body: { Latitude, Longitude } }) => {
  const queueRequest = await getRecommendation(Latitude, Longitude);

  return {
    message: 'Success!',
    queueRequest: queueRequest,
  };
};

export const handler = middyfy(_handler, InputSchema);
