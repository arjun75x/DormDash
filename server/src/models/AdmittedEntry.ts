import { multiQuery, query } from 'middleware/custom/mysql-connector';
import moment from 'moment';

export interface AdmittedEntryFromSQL {
  [key: string]: string | number | null;
  EntryID: number;
  MealType: string;
  AdmitOffQueueTime: string;
  GroupArrivalTime: string;
  GroupExitTime: string;
  TableID: number;
  QueueRequestID: number;
}

export interface AdmittedEntryWithMetaFromSQL extends AdmittedEntryFromSQL {
  DiningHallName: string;
  QueueGroup: string; // JSON array of string net-ids
}

export interface AdmittedEntry {
  [key: string]: string | number | boolean | Date | Array<string>;
  EntryID: number;
  MealType: string;
  AdmitOffQueueTime: Date;
  GroupArrivalTime?: Date;
  GroupExitTime?: Date;
  TableID: number;
  QueueRequestID: number;
}

export interface AdmittedEntryWithMeta extends AdmittedEntry {
  DiningHallName: string;
  QueueGroup: Array<string>;
}

const parseAdmittedEntryWithGroupFromSQL: (
  queueRequest: AdmittedEntryWithMetaFromSQL
) => AdmittedEntryWithMeta = (admittedEntry) => ({
  ...admittedEntry,
  AdmitOffQueueTime:
    admittedEntry.AdmitOffQueueTime == null
      ? null
      : moment(admittedEntry.AdmitOffQueueTime).toDate(),
  GroupArrivalTime:
    admittedEntry.GroupArrivalTime == null
      ? null
      : moment(admittedEntry.GroupArrivalTime).toDate(),
  GroupExitTime:
    admittedEntry.GroupExitTime == null
      ? null
      : moment(admittedEntry.GroupExitTime).toDate(),
  QueueGroup: JSON.parse(admittedEntry.QueueGroup),
});

export const attemptAdmit: (
  NetID: string
) => Promise<AdmittedEntryWithMeta | null> = async (NetID) => {
  const admittedEntry = (
    await multiQuery<AdmittedEntryWithMetaFromSQL>(
      `
      START TRANSACTION;

      DROP TEMPORARY TABLE IF EXISTS ToAdmit;

      CREATE TEMPORARY TABLE ToAdmit
      AS (
        SELECT
          q.QueueRequestID,
          dht.DiningHallName,
          dht.TableID
        FROM QueueRequest q
        NATURAL JOIN DiningHallTable dht
        WHERE
          q.EnterQueueTime <= CURRENT_TIMESTAMP  -- Ready to eat
          AND q.ExitQueueTime IS NULL  -- Filter out those admitted off the queue
          AND q.Canceled = FALSE  -- Filter out those who left the queue
          AND dht.TableID NOT IN (
            SELECT TableID
            FROM AdmittedEntry
            WHERE GroupExitTime IS NULL
          )  -- Filter out occupied tables
          AND (
            SELECT COUNT(*)
            FROM QueueGroup g
            WHERE g.QueueRequestID = q.QueueRequestID
          ) <= dht.Capacity -- Filter only tables with enough seats
          AND ? IN (
            SELECT NetID
            FROM QueueGroup g
            WHERE g.QueueRequestID = q.QueueRequestID
          )
        ORDER BY q.EnterQueueTime DESC, dht.Capacity DESC
        LIMIT 1
      );

      INSERT INTO AdmittedEntry (QueueRequestID, TableID)
      SELECT QueueRequestID, TableID
      FROM ToAdmit;

      UPDATE QueueRequest
      SET ExitQueueTime = CURRENT_TIMESTAMP
      WHERE QueueRequestID IN (SELECT QueueRequestID FROM ToAdmit);

      COMMIT;

      SELECT
        EntryID,
        MealType,
        AdmitOffQueueTime,
        TableID,
        QueueRequestID,
        DiningHallName,
        CONCAT(
          '[',
          GROUP_CONCAT(
            CONCAT(
              '"',
              NetID,
              '"'
            )
          ),
          ']'
        ) AS QueueGroup
      FROM AdmittedEntry
      NATURAL JOIN QueueGroup
      NATURAL JOIN DiningHallTable
      WHERE QueueRequestID IN (SELECT QueueRequestID FROM ToAdmit)
      GROUP BY EntryID;
      `,
      [NetID],
      6
    )
  ).shift();

  return admittedEntry != null ? parseAdmittedEntryWithGroupFromSQL(admittedEntry) : null;
};

export const leaveHall: (NetID: string) => Promise<Array<void>> = async (NetID) =>
  query<void>(
    `
      UPDATE AdmittedEntry
      NATURAL JOIN QueueGroup
      SET GroupExitTime = CURRENT_TIMESTAMP
      WHERE 
          GroupArrivalTime IS NOT NULL
          AND GroupExitTime IS NULL
          AND NetID = ?
    `,
    [NetID]
  );

export const arriveAtHall: (NetID: string) => Promise<Array<void>> = async (NetID) =>
  query<void>(
    `
      UPDATE AdmittedEntry
      NATURAL JOIN QueueGroup
      SET GroupArrivalTime = CURRENT_TIMESTAMP
      WHERE 
          GroupArrivalTime IS NULL
          AND GroupExitTime IS NULL
          AND NetID = ?
    `,
    [NetID]
  );

export const getActivity: () => Promise<Array<void>> = async () =>
  query<void>(
    `
    `,
    []
  );
