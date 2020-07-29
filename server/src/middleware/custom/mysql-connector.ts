import mysql from 'mysql';
import util from 'util';

const log: (shouldLog: boolean, message: string) => void = (shouldLog, message) =>
  shouldLog ? console.log(message) : null;

export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

export const query: <T>(sql: string, values?: Array<any>) => Array<T> = (sql, values) =>
  util.promisify(connection.query).call(connection, sql, values);

export const multiQuery: <T>(
  sql: string,
  values?: Array<any>,
  valIdx?: number
) => Promise<Array<T>> = async (sql, values, valIdx = 1) =>
  (await util.promisify(connection.query).call(connection, sql, values))[valIdx];

/** A database connection middleware that creates or persists a connection
 * to MongoDB via Mongoose.
 *
 * Database connections in Lambda can persist across multiple function calls,
 * and for performance you likely do not want to close it after each use.
 *
 * @param {Object} opts
 * @param {Boolean} opts.shouldLog Whether or not to log opening/closing status for connections
 *
 * @return {Object} The middleware.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (opts = { shouldLog: true }) => ({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  before: async () => {
    if (connection.state === 'connected' || connection.state === 'authenticated') {
      log(opts.shouldLog, '=> Using existing database connection');
    } else {
      log(opts.shouldLog, '=> Using new database connection');
      connection.connect();
    }
  },
});
