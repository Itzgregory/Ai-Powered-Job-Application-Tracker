const express = require('express');
const { authMiddleware } = require('../../middlewares/authentication/authMiddleware');

const router = express.Router();

module.exports = routerJobs = () => {
    router
        .get('/applied/:id', (req, res) => res.status(401).json({ error: "Unauthorized" }))
        .get('/interviews/:id',  (req, res) => res.status(401).json({ error: "Unauthorized" }))
        .get('/', (req, res) => res.status(401).json({ error: "Unauthorized" }))
    return router;
};
