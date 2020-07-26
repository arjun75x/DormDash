import { query } from 'middleware/custom/mysql-connector';
import { DiningHallTableBase } from 'models/DiningHallTable';

export interface DiningHallBase {
  DiningHallName: string;
  Latitude: number;
  Longitude: number;
}

interface DiningHallWithTablesSQL extends DiningHallBase {
  Tables: string; // JSON
}

export interface DiningHallWithTables extends DiningHallBase {
  Tables: Array<DiningHallTableBase>;
}

export const getDiningHalls: () => Promise<Array<DiningHallWithTables>> = async () =>
  (
    await query<DiningHallWithTablesSQL>(`
    SELECT 
      dh.DiningHallName, 
      dh.Latitude, 
      dh.Longitude,
      CONCAT(
        '[',
        GROUP_CONCAT(
          JSON_OBJECT(
            'TableID', dht.TableID,
            'Capacity', dht.Capacity
          )
        ),
        ']'
      ) AS Tables
    FROM DiningHall dh
    LEFT JOIN DiningHallTable dht ON dh.DiningHallName = dht.DiningHallName
    GROUP BY dh.DiningHallName
  `)
  ).map((jsonRes) => {
    const Tables: Array<DiningHallTableBase> = JSON.parse(jsonRes.Tables);
    return { ...jsonRes, Tables };
  });

export const createDiningHall: (
  DiningHallName: string,
  Latitude: number,
  Longitude: number
) => Promise<Array<void>> = async (DiningHallName, Latitude, Longitude) =>
  await query<void>(
    `
    INSERT INTO DiningHall(DiningHallName, Latitude, Longitude)
    VALUES (?, ?, ?)
  `,
    [DiningHallName, Latitude, Longitude]
  );

export const deleteDiningHall: (diningHallName: string) => Promise<Array<void>> = async (
  DiningHallName
) =>
  await query<void>(
    `
    DELETE FROM DiningHall
    WHERE DiningHallName = ?
  `,
    [DiningHallName]
  );
