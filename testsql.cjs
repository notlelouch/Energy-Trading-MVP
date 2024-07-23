const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.POSTGRES_URL,
});

client.connect()
  .then(() => {
    console.log('Connected to the database');
    return client.query('SELECT NOW()');
  })
  .then((res) => {
    console.log(res.rows[0]);
  })
  .catch((err) => {
    console.error('Connection error', err.stack);
  })
  .finally(() => {
    client.end();
  });
