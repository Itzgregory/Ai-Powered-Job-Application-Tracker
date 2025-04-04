const router = require('express').Router();
const express = require('express');
const cors = require('cors');
const routerUsers = require('./user/user');
const routerJobs = require('./jobs/jobs');

module.exports = routerConfig = () => {
  router
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(
      cors({
        credentials: true,
        origin: ["http://localhost:8080", "http://localhost:3000"],
      })
    );

  router.use('/', routerUsers()); 
  router.use('/jobs', routerJobs());

  return router;
};
