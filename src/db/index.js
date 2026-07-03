import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import { env } from "../config/env.js";

const { Pool } = pkg;

const pool = new Pool({
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});

export const db = drizzle(pool);
export { pool };

