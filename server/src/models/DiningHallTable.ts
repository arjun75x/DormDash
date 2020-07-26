import { query } from 'middleware/custom/mysql-connector';

export interface DiningHallTableBase {
  Capacity: number;
  TableID: number;
}
export interface DiningHallTable extends DiningHallTableBase {
  DiningHallName: string;
}

export const createDiningHallTable: (
  DiningHallName: string,
  Capacity: number
) => Promise<DiningHallTable> = async (DiningHallName, Capacity) => {
  await query<void>(
    `
    INSERT INTO DiningHallTable(DiningHallName, Capacity)
    VALUES (?, ?)
  `,
    [DiningHallName, Capacity]
  );
  return (
    await query<DiningHallTable>(
    `
    SELECT TableID, Capacity, DiningHallName
    FROM DiningHallTable
    WHERE TableID = (SELECT LAST_INSERT_ID())
  `
  )).shift();
}


export const deleteDiningHallTable: (
  diningHallName: string,
  tableID: number
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
