const router = require('express').Router();
const express = require('express');
const cors = require('cors');
const routerUsers = require('./user/user');
const routerUsersProfile = require('./user/profile');
const routerUsersPrefrences = require('./user/preferences');
const routerUsersCulture = require('./user/culture');
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
  router.use('/talent/edit', routerUsersProfile()); 
  router.use('/talent/edit', routerUsersPrefrences()); 
  router.use('/talent/edit', routerUsersCulture()); 
  router.use('/jobs', routerJobs());

  return router;
};
