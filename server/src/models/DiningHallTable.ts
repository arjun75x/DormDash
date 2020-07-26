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
) => Promise<Array<void>> = async (DiningHallName, TableID) =>
  await query<void>(
    `
    DELETE
    FROM DiningHallTable
    WHERE DiningHallName = ? AND TableID = ?
  `,
    [DiningHallName, TableID]
  );

export const updateDiningHallTable: (
  TableID: number,
  Capacity: number
) => Promise<Array<void>> = async (TableID, Capacity) =>
  await query<void>(
    `
    UPDATE DiningHallTable
    SET Capacity = ?
    WHERE TableID = ?
  `,
    [Capacity, TableID]
  );
