import { createPool } from "mysql2/promise";
import { config, requiredEnv } from "./config.js";

export const pool = createPool({
  ...config.database,
  password: requiredEnv("DB_PASSWORD"),
  waitForConnections: true,
});

export const query = (...args) => pool.query(...args);
