const express = require('express');
const { clear } = require('winston');
const swaggerConf = require('./swagger/conf');
const swaggerUI = require('swagger-ui-express');
const app = express();

// Environment Configuration
require('dotenv').config();
const API_PORT = process.env.API_PORT || 3000;
const API_IP_ADDRESS = process.env.API_IP_ADDRESS || 'localhost';

// Route Imports
const {
    healthCheckRouter
} = require('./versions/v1/routes/routeImports');

app.get("/", (req, res) => res.send("Express API is healthy!"));

app.use(
    "/api/v1/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerConf.specs, swaggerConf.uiOptions)
);

app.get('/api/v1/health', healthCheckRouter);

module.exports = app.listen(API_PORT, API_IP_ADDRESS, () => console.log(`Server started and is listening on port ${API_PORT}`));
