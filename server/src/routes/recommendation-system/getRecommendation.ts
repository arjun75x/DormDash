import type { HTTPRawHandler } from 'routes/handler';

import { getRecommendation } from 'models/RecommendationSystem';
import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/recommendation-system/getRecommendation.is';

const _handler: HTTPRawHandler = async ({ body: { Latitude, Longitude } }) => {
  const recommendation = await getRecommendation(Latitude, Longitude);

  return {
    message: 'Success!',
    DiningHallName: recommendation,
  };
};

export const handler = middyfy(_handler, InputSchema);
