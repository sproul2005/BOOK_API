const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

/**
 * Configure global application middleware
 * @param {import('express').Application} app 
 */
const setupGlobalMiddleware = (app) => {
    // Enable Cross-Origin Resource Sharing
    app.use(cors());

    // Parse JSON request bodies
    app.use(express.json());

    // HTTP request logger (only in dev/test, or custom format)
    // We can default to 'dev', or check NODE_ENV
    app.use(morgan('dev'));
};

module.exports = setupGlobalMiddleware;
