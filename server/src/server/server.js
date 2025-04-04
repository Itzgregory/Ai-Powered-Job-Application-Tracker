const express = require('express');
const http = require('http'); 
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const { variables: { MONGO_URL } } = require('../../config');
const { logerror } = require("../helpers/logger");

const app = express();
const server = http.createServer(app); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", 1);
app.use(cookieParser());

const routerConfig = require('../routes/index');
app.use(routerConfig());

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    logerror.error({
        error: err.message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userId: req.user?.id || 'unauthenticated'
    });

    res.status(statusCode).json({
        success: false,
        message,
        data: null,
        error: {
            code: err.code || 'SERVER_ERROR',
            details: process.env.NODE_ENV === 'production' ? null : err.stack
        }
    });
};

app.use(errorHandler);
module.exports = { app, server }; 