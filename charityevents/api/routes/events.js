import { Router } from 'express';
import { pool } from '../event_db.js';
const router = Router();

router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT e.id, e.name, e.description, e.event_date, e.location, e.price,
              e.goal, e.progress, e.image_url, e.status, c.name AS category
         FROM events e
         JOIN categories c ON e.category_id = c.id
        WHERE e.status IN ('active','past')
        ORDER BY e.event_date ASC`
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

router.get('/search/filter', async (req, res) => {
  try {
    const { date, location, category } = req.query;
    const wheres = [`e.status = 'active'`];
    const params = [];

    if (date) { wheres.push('DATE(e.event_date) = ?'); params.push(date); }
    if (location) { wheres.push('e.location LIKE ?'); params.push(`%${location}%`); }
    if (category) { wheres.push('e.category_id = ?'); params.push(category); }

    const sql = `
      SELECT e.id, e.name, e.description, e.event_date, e.location, e.price,
             e.goal, e.progress, e.image_url, c.name AS category
      FROM events e
      JOIN categories c ON e.category_id = c.id
      ${wheres.length ? 'WHERE ' + wheres.join(' AND ') : ''}
      ORDER BY e.event_date ASC
    `;
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Search failed' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT e.id, e.name, e.description, e.event_date, e.location, e.price,
              e.goal, e.progress, e.image_url, e.status, c.name AS category
         FROM events e
         JOIN categories c ON e.category_id = c.id
        WHERE e.id = ?`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Event not found' });
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

export default router;
