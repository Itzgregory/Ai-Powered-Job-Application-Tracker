const express = require('express');
const { authMiddleware } = require('../../middlewares/authentication/authMiddleware');
const {createProfileController, getProfileController} = require('../../controllers/user/userProfile/profile');

const router = express.Router();


module.exports = routerUsersProfile = () => {
    router         
        .post('/profile',  authMiddleware, createProfileController)
        .get('/profile/user',  authMiddleware, getProfileController)
     
    return router;
}