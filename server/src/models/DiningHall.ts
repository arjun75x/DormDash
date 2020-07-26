import { query } from 'middleware/custom/mysql-connector';

export interface DiningHall {
  DiningHallName: string;
  Latitude: number;
  Longitude: number;
  TableIDs: string;
  TableCapacities: string;
}

export const getDiningHalls: () => Promise<Array<DiningHall>> = async () =>
  await query<DiningHall>(`
    SELECT 
      DiningHallName, 
      Latitude, 
      Longitude, 
      GROUP_CONCAT(TableID ORDER BY TableID SEPARATOR ',') as TableIDs,
      GROUP_CONCAT(Capacity ORDER BY TableID SEPARATOR ',') as TableCapacities
    FROM DiningHall NATURAL JOIN DiningHallTable
    GROUP BY DiningHallName
  `);
