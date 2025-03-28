import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

async function main() {
    const client = await pool.connect();
    try {
        await client.query('select * from check_events;');
    } catch(err) {
        console.log(err);
    } finally {
        client.release();
    }
}

main()
    .then(() => console.log('Connected to Postgres'))
    .catch(err => console.log('Error connecting to Postgres', err));

app.post('/check-in', async (req, res) => {
  const { name, site_id } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO check_events (name, site_id, type) VALUES ($1, $2, $3) RETURNING *',
      [name, site_id, 'in']
    );
    res.status(201).json((result).rows[0]);
  } catch (err) {
    console.error('Check-in error:', err);
    res.status(500).send('Check-in failed');
  }
});

app.post('/check-out', async (req, res) => {
    const { name, site_id } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO check_events (name, site_id, type) VALUES ($1, $2, $3) RETURNING *',
        [name, site_id, 'out']
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Check-out error:', err);
      res.status(500).send('Check-out failed');
    }
});

app.get('/on-site', async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT DISTINCT ON (name, site_id) *
        FROM check_events
        ORDER BY name, site_id, timestamp DESC
      `);
  
      const onSite = result.rows.filter(row => row.type === 'in');
  
      res.json(onSite);
    } catch (err) {
      console.error('On-site fetch error:', err);
      res.status(500).send('Failed to fetch on-site workers');
    }
});

app.get('/history', async (req, res) => {
  const { name, siteId, from, to } = req.query;

  let query = 'SELECT * FROM check_events WHERE 1=1';
  const values: any[] = [];

  if (name) {
    values.push(`%${name}%`);
    query += ` AND name ILIKE $${values.length}`;
  }

  if (siteId) {
    values.push(`%${siteId}%`);
    query += ` AND site_id ILIKE $${values.length}`;
  }

  if (from) {
    values.push(from);
    query += ` AND timestamp >= $${values.length}`;
  }

  if (to) {
    values.push(to);
    query += ` AND timestamp <= $${values.length}`;
  }

  query += ' ORDER BY timestamp DESC';

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).send('Failed to fetch history');
  }
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on http://localhost:${process.env.SERVER_PORT}`);
});