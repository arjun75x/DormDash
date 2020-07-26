import { query } from 'middleware/custom/mysql-connector';

export interface DiningHall {
  DiningHallName: string;
  Latitude: number;
  Longitude: number;
  NumAvailableTables: number;
  LargestAvailableTable: number;
}

export interface DiningHallWithMeta extends DiningHall {
  Capacity: number;
}

export const getDiningHalls: () => Promise<Array<DiningHallWithMeta>> = async () =>
  await query<DiningHallWithMeta>(`
    SELECT 
      DiningHallName, 
      Latitude, 
      Longitude, 
      IFNULL(SUM(Capacity), 0) as Capacity,
      COUNT(TableID) as NumAvailableTables,
      MAX(Capacity) as LargestAvailableTable
    FROM DiningHall NATURAL JOIN DiningHallTable
    WHERE TableID NOT IN (SELECT ae.TableID FROM AdmittedEntry ae WHERE ae.DiningHallName = DiningHallName AND ae.GroupExitTime = NULL)
    GROUP BY DiningHallName
  `);
