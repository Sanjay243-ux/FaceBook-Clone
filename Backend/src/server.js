import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Route imports
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import commentRoutes from './routes/comments.js';
import reactionRoutes from './routes/reactions.js';
import friendRoutes from './routes/friends.js';
import groupRoutes from './routes/groups.js';
import notificationRoutes from './routes/notifications.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Global Middleware ───────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
});
app.use('/api/', limiter);

// ─── API Routes ──────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/reactions', reactionRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/notifications', notificationRoutes);

// ─── Health Check ────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ─── 404 Handler ─────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

// ─── Error Handler ───────────────────────────────
app.use(errorHandler);

import supabaseAdmin from './config/supabase.js';

// ─── Start Server ────────────────────────────────
app.listen(PORT, async () => {
  const border = '==================================================';
  console.log(`\n${border}`);
  console.log(`🚀  FACEBOOK CLONE API STARTED `);
  console.log(`${border}`);
  console.log(`📡  Port        : ${PORT}`);
  console.log(`🔧  Environment : ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐  CORS Origin : ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`📋  Health Check: http://localhost:${PORT}/api/health`);
  
  // Ping database to ensure connection
  process.stdout.write(`🗄️   Database    : Connecting...`);
  try {
    const start = Date.now();
    const { error } = await supabaseAdmin.from('users').select('id').limit(1);
    const ms = Date.now() - start;
    if (error) throw error;
    process.stdout.write(`\r🗄️   Database    : ✅ Connected to Supabase (${ms}ms)\n`);
  } catch (err) {
    process.stdout.write(`\r🗄️   Database    : ❌ Disconnected - ${err.message}\n`);
  }
  
  console.log(`${border}\n`);
});

export default app;
