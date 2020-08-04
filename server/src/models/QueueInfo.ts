import { query } from 'middleware/custom/mysql-connector';

export const getQueueSize = async (diningHallName: string): Promise<number> => {
  const result = await query<{ Size: number }>(
    `
    SELECT COUNT(*) as Size
    FROM QueueRequest
    WHERE Canceled = 0 
    AND DiningHallName = ?
    AND ExitQueueTime IS NULL
  `,
    [diningHallName]
  );

  return result[0].Size;
};
