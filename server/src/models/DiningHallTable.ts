import { query } from 'middleware/custom/mysql-connector';

export interface DiningHallTable {
  DiningHallName: string;
  Capacity: number;
  TableID: number;
}

export const createDiningHallTable: (
  DiningHallName: string,
  Capacity: number
) => Promise<Array<void>> = async (DiningHallName, Capacity) =>
  await query<void>(
    `
    INSERT INTO DiningHallTable(DiningHallName, Capacity)
    VALUES (?, ?)
  `,
    [DiningHallName, Capacity]
  );

  export const deleteDiningHallTable: (
    diningHallName: string, tableID: number
  ) => Promise<Array<void>> = async (diningHallName, tableID) =>
    await query<void>(
      `
      DELETE
      FROM DiningHallTable dht
      WHERE dht.DiningHallName = ? AND dht.TableID = ?
    `,
      [diningHallName, tableID]
    );
