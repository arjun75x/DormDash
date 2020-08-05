import { query } from 'middleware/custom/mysql-connector';

export interface RecSystemBase {
  DiningHallName: string;
  NumRequests: number;
}

export const rankByLocationSQL: (
  Latitude: number,
  Longitude: number
) => Promise<Array<string>> = async (Latitude, Longitude) => {
  const rankedHalls = await query<RecSystemBase>(
    `
        SELECT DiningHallName
        FROM DiningHall
        ORDER BY (POW((Latitude - ?), 2) + POW((Longitude - ?), 2))
        `,
    [Latitude, Longitude]
  );
  return rankedHalls.map((hall) => hall.DiningHallName);
};

export const rankByBusynessSQL: () => Promise<Array<string>> = async () => {
  const rankedHalls = await query<RecSystemBase>(
    `
        SELECT dh.DiningHallName as DiningHallName, IFNULL(q.Num, 0) as NumRequests
        FROM DiningHall dh LEFT JOIN (
            SELECT qr.DiningHallName as DiningHallName, COUNT(qr.QueueRequestID) as Num
            FROM QueueRequest qr
            WHERE qr.ExitQueueTime IS NULL
            GROUP BY qr.DiningHallName
        ) q on dh.DiningHallName = q.DiningHallName
        GROUP BY dh.DiningHallName
        ORDER BY IFNULL(q.Num, 0)
        `
  );
  return rankedHalls.map((hall) => hall.DiningHallName);
};

export const rankByPastDataSQL: () => Promise<Array<string>> = async () => {
  await query<void>(
    `
        DROP PROCEDURE IF EXISTS AVG_PAST_DATA;

        CREATE PROCEDURE AVG_PAST_DATA()
            BEGIN
                DECLARE i int default 0;

                DROP TABLE IF EXISTS PastDataTable;

                CREATE TABLE PastDataTable(
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    DiningHallName VARCHAR(255),
                    NumRequests INT
                );

                WHILE i < 7 DO
                    INSERT INTO PastDataTable (DiningHallName, NumRequests)
                    SELECT dh.DiningHallName as DiningHallName, IFNULL(q.Num, 0) as NumRequests
                    FROM DiningHall dh LEFT JOIN (
                        SELECT qr.DiningHallName as DiningHallName, COUNT(qr.QueueRequestID) as Num
                        FROM QueueRequest qr
                        WHERE (qr.RequestTime >= NOW() - INTERVAL (25 + (24 * i)) HOUR) AND (qr.RequestTime <= NOW() - INTERVAL (23 + (24 * i)) HOUR)
                        GROUP BY qr.DiningHallName
                    ) q on dh.DiningHallName = q.DiningHallName
                    GROUP BY dh.DiningHallName
                    ORDER BY IFNULL(q.Num, 0);
                    SET i = i + 1;
                END WHILE;                
            END;
        
        CALL AVG_PAST_DATA();
        `
  );
  const rankedHalls = await query<RecSystemBase>(
    `
        SELECT DiningHallName, AVG(NumRequests) as NumRequests
        FROM PastDataTable
        GROUP BY DiningHallName
        ORDER BY AVG(NumRequests) ASC;
        `
  );
  return rankedHalls.map((hall) => hall.DiningHallName);
};

export const getRecommendation: (
  Latitude: number,
  Longitude: number
) => Promise<string> = async (Latitude, Longitude) => {
  const rankedLocations = await rankByLocationSQL(Latitude, Longitude);
  const rankedBusyness = await rankByBusynessSQL();
  const rankedPastData = await rankByPastDataSQL();
  const finalRank = {};

  for (let i = 0; i < rankedLocations.length; i++) {
    finalRank[rankedLocations[i]] += i;
    finalRank[rankedBusyness[i]] += i * 0.5;
    finalRank[rankedPastData[i]] += i * 0.25;
  }
  let best_hall = Object.keys(finalRank)[0];
  let lowest_rank = Object.values(finalRank)[0];

  Object.keys(finalRank).forEach((hall) => {
    if (finalRank[hall] < lowest_rank) {
      lowest_rank = finalRank[hall];
      best_hall = hall;
    }
  });

  return best_hall;
};
