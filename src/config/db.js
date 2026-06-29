import pkg from "pg";
import { env } from "./env.js";

const { Pool } = pkg;

const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
});

export const connectDB = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ PostgreSQL connected");
  } catch (error) {
    console.error("❌ PostgreSQL connection failed:", error.message);
    process.exit(1);
  }
};

export default pool;