import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import categories from './routes/categories.js';
import events from './routes/events.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/categories', categories);
app.use('/api/events', events);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
