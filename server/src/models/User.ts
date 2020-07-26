import { query, multiQuery } from 'middleware/custom/mysql-connector';

export interface User {
  [key: string]: string;
  NetID: string;
  Name: string;
}

export const getUserByNetId: (netID: string) => Promise<User | null> = async (netID) =>
  (
    await query<User>(
      `
    SELECT 
      Name,
      NetID
    FROM User
    WHERE netID = ?
  `,
      [netID]
    )
  ).shift();

export const getOrCreateUserByNetId: (
  netID: string,
  name?: string
) => Promise<User> = async (netID, name = 'NULL') =>
  (
    await multiQuery<User>(
      `
    INSERT IGNORE INTO User(NetID, Name)
    VALUES (?, ?);

    SELECT 
      Name,
      NetID
    FROM User
    WHERE NetID = ?
  `,
      [netID, name, netID]
    )
  ).shift();
