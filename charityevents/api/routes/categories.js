import { Router } from 'express';
import { pool } from '../event_db.js';
const router = Router();

router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name FROM categories ORDER BY name');
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

export default router;
