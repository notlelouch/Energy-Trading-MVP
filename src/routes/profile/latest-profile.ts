import { Pool } from 'pg';
import { POSTGRES_URL } from '$env/static/private';

const pool = new Pool({ connectionString: POSTGRES_URL });

export async function get() {
  const client = await pool.connect();

  try {
    const result = await client.query('SELECT * FROM names ORDER BY created_at DESC LIMIT 1');
    const latestProfile = result.rows[0];

    return {
      body: latestProfile,
    };
  } catch (error) {
    console.error(error);

    return {
      status: 500,
      body: {
        error: 'An error occurred while fetching the latest profile',
      },
    };
  } finally {
    client.release();
  }
}