import { query, multiQuery } from 'middleware/custom/mysql-connector';
import { getDiningHalls } from 'models/DiningHall'

export const rankByLocation: (
    Latitude: number,
    Longitude: number
) => Promise<Array<string>> = async (Latitude, Longitude) => {
    const diningHalls = await getDiningHalls();
    const distance_hall = {};
    diningHalls.forEach(hall => {
        const distance = Math.sqrt(Math.pow(Latitude - hall.Latitude, 2) + Math.pow(Longitude - hall.Longitude, 2));
        distance_hall[distance] = hall.DiningHallName
    });
    const distances = Object.keys(distance_hall);
    distances.sort();
    const out = [];
    distances.forEach(distance => {
        out.push(distance_hall[distance])
    });
    return out;
}

export const getRecommendation: (
    Latitude: number,
    Longitude: number
) => Promise<string> = async (Latitude, Longitude) => {
    const rankedLocations = await rankByLocation(Latitude, Longitude);
    return rankedLocations[0];
}