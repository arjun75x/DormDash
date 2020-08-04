import { multiQuery } from 'middleware/custom/mysql-connector';
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
      ) AS QueueGroup
      FROM QueueRequest q
      LEFT JOIN QueueGroup g ON q.QueueRequestID = g.QueueRequestID
      WHERE q.QueueRequestID = @QueueRequestID;
      `,
      [NetID.map((netID) => [netID]), DiningHallName],
      8
    )
  ).shift();

  return queueRequest != null ? parseQueueRequestWithGroupFromSQL(queueRequest) : null;
};

export const checkGroup: (
  NetID: string
) => Promise<QueueRequest | null> = async (NetID) => {
  const queueRequest = (
    await multiQuery<QueueRequestWithGroupFromSQL>(
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
      ) AS QueueGroup
      FROM QueueRequest q
      LEFT JOIN QueueGroup g ON q.QueueRequestID = g.QueueRequestID
      WHERE q.QueueRequestID in (
        SELECT QueueRequestID
        FROM QueueGroup g
        WHERE g.NetID = ?
        ORDER BY QueueRequestID DESC
        LIMIT 1
        );
      `,
      [NetID],
      8
    )
  ).shift();

  return queueRequest != null ? parseQueueRequestWithGroupFromSQL(queueRequest) : null;
};
