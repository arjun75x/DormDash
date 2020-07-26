import { query, multiQuery } from 'middleware/custom/mysql-connector';

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
) => Promise<DiningHallTable> = async (DiningHallName, Capacity) =>
  (
    await multiQuery<DiningHallTable>(
      `
    INSERT INTO DiningHallTable(DiningHallName, Capacity)
    VALUES (?, ?);

    SELECT TableID, Capacity, DiningHallName
    FROM DiningHallTable
    WHERE TableID = (SELECT LAST_INSERT_ID())
  `,
      [DiningHallName, Capacity]
    )
  ).shift();

export const deleteDiningHallTable: (tableID: number) => Promise<Array<void>> = async (
  TableID
) =>
  await query<void>(
    `
    DELETE
    FROM DiningHallTable
    WHERE TableID = ?
  `,
    [TableID]
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
