import { query } from 'middleware/custom/mysql-connector';
import { getDiningHalls } from 'models/DiningHall'

export interface RecSystemBase {
    DiningHallName: string;
    NumRequests: number;
}

function sortDictionaryOnKeys(dict) {
	var toSort = [];
	for (var key in dict) {
        if (dict.hasOwnProperty(key)) {
            toSort.push([key, dict[key]]);
        }
    }
    toSort.sort(function(a, b)
    {
        return a[1]-b[1];
    });
    var out = Array<string>();
	toSort.forEach(elem => {
        out.push(elem[0]);
    });
    return out;
}

export const rankByLocation: (
    Latitude: number,
    Longitude: number
) => Promise<Array<string>> = async (Latitude, Longitude) => {
    const diningHalls = await getDiningHalls();
    const hallByDistance = {};

    diningHalls.forEach(hall => {
        const distance = Math.sqrt(Math.pow(Latitude - hall.Latitude, 2) + Math.pow(Longitude - hall.Longitude, 2));
        hallByDistance[hall.DiningHallName] = distance;
    });

    return sortDictionaryOnKeys(hallByDistance);
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
    var out = Array<string>();
    rankedHalls.forEach(hall => {
        out.push(hall.DiningHallName);
    });
    return out;
}

export const rankByBusyness: () => Promise<Array<string>> = async () => {
    const diningHalls = await getDiningHalls();
    const hallByQueueSize = {};

    for (var i in diningHalls) {
        var hall = diningHalls[i];
        const queueSize = (
            await query<number>(
            `
            SELECT COUNT(QueueRequestID) as size
            FROM QueueRequest
            WHERE ExitQueueTime IS NULL AND DiningHallName = ?
            `,
        [hall.DiningHallName]
        )).shift()
        hallByQueueSize[hall.DiningHallName] = queueSize['size'];
    }

    return sortDictionaryOnKeys(hallByQueueSize);
}

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
    var out = Array<string>();
    rankedHalls.forEach(hall => {
        out.push(hall.DiningHallName);
    });
    return out;
}

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
    var out = Array<string>();
    rankedHalls.forEach(hall => {
        out.push(hall.DiningHallName);
    });
    return out;
}

export const getRecommendation: (
    Latitude: number,
    Longitude: number
) => Promise<string> = async (Latitude, Longitude) => {
    const rankedLocations = await rankByLocationSQL(Latitude, Longitude);
    const rankedBusyness = await rankByBusynessSQL();
    const rankedPastData = await rankByPastDataSQL();
    const final_rank = {};
    for (var i = 0; i < rankedLocations.length; i++) {
        final_rank[rankedLocations[i]] += i;
        final_rank[rankedBusyness[i]] += i * 0.5;
        final_rank[rankedPastData[i]] += i * 0.25;
    }
    var best_hall = Object.keys(final_rank)[0];
    var lowest_rank = Object.values(final_rank)[0];
    for (var hall in final_rank) {
        if (final_rank[hall] < lowest_rank) {
            lowest_rank = final_rank[hall];
            best_hall = hall;
        }
    }
    return best_hall;
}