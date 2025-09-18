import { createPool } from "mysql2/promise";

// const pool = createPool({
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   database: "gacha_game",
//   waitForConnections: true,
//   connectionLimit: 10,
// });

const pool = createPool({
  host: "172.236.153.97",
  user: "root",
  password: "!@#$%12345qwert",
  database: "gacha_game",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

export const query = (...args) => pool.query(...args);
export default pool;
