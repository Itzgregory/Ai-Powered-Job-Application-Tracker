const express = require('express');
const { authMiddleware } = require('../../middlewares/authentication/authMiddleware');
const {createProfile} = require('../../controllers/user/userProfile/profile');

const router = express.Router();


module.exports = routerUsersProfile = () => {
    router         
        .post('/profile',  authMiddleware, createProfile)
     
    return router;
}