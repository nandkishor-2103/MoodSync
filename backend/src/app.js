const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');

/**
 * Middleware
 * @desc Parse JSON request body
 */
app.use(express.json());

/**
 * Middleware
 * @desc Parse cookie header
 */
app.use(cookieParser());

/**
 * Middleware
 * @desc Enable CORS
 */
app.use(
    cors({
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
        credentials: true,
    }),
);

/**
 * Routes
 * @desc Define API routes
 */
const authRoutes = require('./routes/auth.routes');
const songRoutes = require('./routes/song.routes');
const historyRoutes = require('./routes/history.routes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/history', historyRoutes);

module.exports = app;
