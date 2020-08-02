import { query, multiQuery } from 'middleware/custom/mysql-connector';
import { getDiningHalls } from 'models/DiningHall'

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

export const getRecommendation: (
    Latitude: number,
    Longitude: number
) => Promise<string> = async (Latitude, Longitude) => {
    const rankedLocations = await rankByLocation(Latitude, Longitude);
    const rankedBusyness = await rankByBusyness();
    const final_rank = {};
    for (var i = 0; i < rankedLocations.length; i++) {
        final_rank[rankedLocations[i]] += i;
        final_rank[rankedBusyness[i]] += i * 0.5;
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