import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "notlelouch",
  host: "localhost",
  database: "energy",
  password: "password",
  port: 5432,
});

export default pool;
