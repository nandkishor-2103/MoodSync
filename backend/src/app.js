const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            process.env.CORS_ORIGIN,
        ].filter(Boolean),
        credentials: true,
    }),
);

const authRoutes = require('./routes/auth.routes');
const songRoutes = require('./routes/song.routes');
const historyRoutes = require('./routes/history.routes');

app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/history', historyRoutes);

module.exports = app;
