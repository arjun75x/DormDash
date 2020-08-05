import { query, multiQuery } from 'middleware/custom/mysql-connector';
import moment from 'moment';

export interface QueueRequestFromSQL {
  [key: string]: string | number;
  QueueRequestID: number;
  EnterQueueTime: string;
  ExitQueueTime: string;
  RequestTime: string;
  Preferences: string;
  Canceled: number;
  DiningHallName: string;
}

export interface QueueRequestWithGroupFromSQL extends QueueRequestFromSQL {
  QueueGroup: string; // JSON array of string net-ids
}

export interface QueueRequest {
  [key: string]: string | number | boolean | Date | Array<string>;
  QueueRequestID: number;
  EnterQueueTime: Date;
  ExitQueueTime: Date;
  RequestTime: Date;
  Preferences: string;
  Canceled: boolean;
  DiningHallName: string;
}

export interface QueueRequestWithGroup extends QueueRequest {
  QueueGroup: Array<string>;
}

const parseQueueRequestWithGroupFromSQL: (
  queueRequest: QueueRequestWithGroupFromSQL
) => QueueRequest = (queueRequest) => ({
  ...queueRequest,
  EnterQueueTime:
    queueRequest.EnterQueueTime == null
      ? null
      : moment(queueRequest.EnterQueueTime).toDate(),
  ExitQueueTime:
    queueRequest.ExitQueueTime == null
      ? null
      : moment(queueRequest.ExitQueueTime).toDate(),
  RequestTime:
    queueRequest.RequestTime == null ? null : moment(queueRequest.RequestTime).toDate(),
  Canceled: Boolean(queueRequest.Canceled),
  QueueGroup: JSON.parse(queueRequest.QueueGroup),
});

export const joinQueue: (
  DiningHallName: string,
  NetID: Array<string>
) => Promise<QueueRequest | null> = async (DiningHallName, NetID) => {
  const queueRequest = (
    await multiQuery<QueueRequestWithGroupFromSQL>(
      `
      SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
      START TRANSACTION;

      DROP TEMPORARY TABLE IF EXISTS GroupMembers;

      CREATE TEMPORARY TABLE GroupMembers(
        NetID VARCHAR(255) NOT NULL PRIMARY KEY
      );

      INSERT INTO GroupMembers(NetID)
      VALUES ?;

      INSERT INTO QueueRequest(DiningHallName)
      VALUES (?);

      SET @QueueRequestID := LAST_INSERT_ID();

      INSERT INTO QueueGroup(NetID, QueueRequestID)
      SELECT NetID, @QueueRequestID AS QueueRequestID
      FROM GroupMembers;

      COMMIT;

      SELECT 
      q.QueueRequestID,
      q.EnterQueueTime,
      q.ExitQueueTime,
      q.RequestTime,
      q.Preferences,
      q.Canceled,
      q.DiningHallName,
      CONCAT(
        '[',
        GROUP_CONCAT(
          CONCAT(
            '"',
            g.NetID,
            '"'
          )
        ),
        ']'
      ) AS QueueGroup,
      (
        SELECT COUNT(*) 
        FROM QueueRequest qq
        WHERE 
          qq.ExitQueueTime IS NULL 
          AND qq.Canceled = FALSE
          AND qq.DiningHallName = q.DiningHallName
          AND qq.EnterQueueTime <= q.EnterQueueTime
      ) AS QueuePosition
      FROM QueueRequest q
      LEFT JOIN QueueGroup g ON q.QueueRequestID = g.QueueRequestID
      WHERE q.QueueRequestID = @QueueRequestID;
      `,
      [NetID.map((netID) => [netID]), DiningHallName],
      9
    )
  ).shift();

  return queueRequest != null ? parseQueueRequestWithGroupFromSQL(queueRequest) : null;
};

export const checkGroup: (NetID: string) => Promise<QueueRequest | null> = async (
  NetID
) => {
  const queueRequest = (
    await query<QueueRequestWithGroupFromSQL>(
      `
      SELECT 
      q.QueueRequestID,
      q.EnterQueueTime,
      q.ExitQueueTime,
      q.RequestTime,
      q.Preferences,
      q.Canceled,
      q.DiningHallName,
      CONCAT(
        '[',
        GROUP_CONCAT(
          CONCAT(
            '"',
            g.NetID,
            '"'
          )
        ),
        ']'
      ) AS QueueGroup,
      (
        SELECT COUNT(*) 
        FROM QueueRequest qq
        WHERE qq.ExitQueueTime IS NULL 
          AND qq.Canceled = FALSE
          AND qq.DiningHallName = q.DiningHallName
          AND qq.EnterQueueTime <= q.EnterQueueTime
      ) AS QueuePosition
      FROM QueueRequest q
      LEFT JOIN QueueGroup g ON q.QueueRequestID = g.QueueRequestID
      WHERE q.QueueRequestID = (
        SELECT QueueRequestID
        FROM QueueGroup
        WHERE NetID = ?
        ORDER BY QueueRequestID DESC
        LIMIT 1
      )
      AND q.Canceled = FALSE
      AND q.ExitQueueTime IS NULL;
      `,
      [NetID, NetID, NetID]
    )
  ).shift();

  return queueRequest.QueueRequestID !== null
    ? parseQueueRequestWithGroupFromSQL(queueRequest)
    : null;
};

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

export const leaveQueue: (NetID: string) => Promise<Array<void>> = async (NetID) =>
  await query<void>(
    `
    UPDATE QueueRequest NATURAL JOIN QueueGroup
    SET Canceled = TRUE
    WHERE 
      NetID = ? 
      AND ExitQueueTime IS NULL 
      AND EnterQueueTime IS NOT NULL
  `,
    [NetID]
  );

export const joinQueueBF: (
  DiningHallName: string,
  NetID: Array<string>,
  joinTime: string
) => Promise<QueueRequest | null> = async (DiningHallName, NetID, joinTime) => {
  const joinTimeDT = moment(joinTime).toDate();
  const queueRequest = (
    await multiQuery<QueueRequestWithGroupFromSQL>(
      ` 
      SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
      START TRANSACTION;

      DROP TEMPORARY TABLE IF EXISTS GroupMembers;

      CREATE TEMPORARY TABLE GroupMembers(
        NetID VARCHAR(255) NOT NULL PRIMARY KEY
      );

      INSERT INTO GroupMembers(NetID)
      VALUES ?;

      INSERT INTO QueueRequest(DiningHallName, EnterQueueTime, RequestTime)
      VALUES (?, ?, ?);

      SET @QueueRequestID := LAST_INSERT_ID();

      INSERT INTO QueueGroup(NetID, QueueRequestID)
      SELECT NetID, @QueueRequestID AS QueueRequestID
      FROM GroupMembers;

      COMMIT;

      SELECT 
      q.QueueRequestID,
      q.EnterQueueTime,
      q.ExitQueueTime,
      q.RequestTime,
      q.Preferences,
      q.Canceled,
      q.DiningHallName,
      CONCAT(
        '[',
        GROUP_CONCAT(
          CONCAT(
            '"',
            g.NetID,
            '"'
          )
        ),
        ']'
      ) AS QueueGroup,
      (
        SELECT COUNT(*) 
        FROM QueueRequest qq
        WHERE 
          qq.ExitQueueTime IS NULL 
          AND qq.Canceled = FALSE
          AND qq.DiningHallName = q.DiningHallName
          AND qq.EnterQueueTime <= q.EnterQueueTime
      ) AS QueuePosition
      FROM QueueRequest q
      LEFT JOIN QueueGroup g ON q.QueueRequestID = g.QueueRequestID
      WHERE q.QueueRequestID = @QueueRequestID;
      `,
      [NetID.map((netID) => [netID]), DiningHallName, joinTimeDT, joinTimeDT],
      9
    )
  ).shift();

  return queueRequest != null ? parseQueueRequestWithGroupFromSQL(queueRequest) : null;
};
