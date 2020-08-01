import { query, multiQuery } from 'middleware/custom/mysql-connector';

export const getRecommendation: (
    Latitude: number,
    Longitude: number
) => Promise<string> = async (Latitude, Longitude) => {
    return "hello";
}