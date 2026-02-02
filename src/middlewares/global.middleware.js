const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const setupGlobalMiddleware = (app) => {
    // Enable Cross-Origin Resource Sharing
    app.use(cors());

    // Parse JSON request bodies
    app.use(express.json());

    //Logging HTTP requests for debugging and monitoring.
    app.use(morgan('dev'));
};

module.exports = setupGlobalMiddleware;
