import { query } from 'middleware/custom/mysql-connector';

export interface User {
  [key: string]: string;
  NetId: string;
  Name: string;
}

export const getUserByNetId: (netId: string) => Promise<User | null> = async (netId) =>
  (
    await query<User>(
      `
    SELECT 
      Name,
      NetId
    FROM User
    WHERE NetId = ?
  `,
      [netId]
    )
  ).shift();

export const getOrCreateUserByNetId: (
  netId: string,
  name?: string
) => Promise<User> = async (netId, name = 'NULL') =>
  (
    await query<User>(
      `
    INSERT IGNORE INTO User(NetId, Name)
    VALUES (?, ?);

    SELECT 
      Name,
      NetId
    FROM User
    WHERE NetId = ?
  `,
      [netId, name, netId]
    )
  ).shift();
