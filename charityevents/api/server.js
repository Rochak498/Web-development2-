// api/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import categories from './routes/categories.js';
import events from './routes/events.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- resolve paths (ESM-friendly) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../client/public');

// --- API routes ---
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/categories', categories);
app.use('/api/events', events);

app.use(express.static(publicDir));

// --- SPA-style fallback for non-API routes ---
// NOTE: Express v5 / path-to-regexp v6: don't use '*'.
// This regex matches any path NOT starting with /api
app.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API + Client running on http://localhost:${PORT}`));
