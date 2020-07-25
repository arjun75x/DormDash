import { query } from 'middleware/custom/mysql-connector';

export interface DiningHall {
  DiningHallName: string;
  Latitude: number;
  Longitude: number;
}

export interface DiningHallWithMeta extends DiningHall {
  Capacity: number;
}

export const getDiningHalls: () => Promise<Array<DiningHallWithMeta>> = async () =>
  await query<DiningHallWithMeta>(`
    SELECT 
      dh.DiningHallName, 
      dh.Latitude, 
      dh.Longitude, 
      IFNULL(SUM(dt.Capacity), 0) as Capacity
    FROM DiningHall dh
    LEFT JOIN DiningHallTable dt ON dh.DiningHallName = dt.DiningHallName
    GROUP BY dh.DiningHallName
  `);
