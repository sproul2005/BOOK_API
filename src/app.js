const express = require('express');
const setupGlobalMiddleware = require('./middlewares/global.middleware');

const app = express();

// Setup Global Middleware
setupGlobalMiddleware(app);

// Routes
const bookRoutes = require('./routes/book.routes');

// Basic health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// API Routes
app.use('/books', bookRoutes);

module.exports = app;
