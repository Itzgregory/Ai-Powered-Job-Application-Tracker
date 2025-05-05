const express = require('express');
const { authMiddleware } = require('../../middlewares/authentication/authMiddleware');
const {userControllers} = require('../../controllers/index');

const router = express.Router();
const userControllerInstance = userControllers();

module.exports = routerUsers = () => {
    router        
        .post('/login', userControllerInstance.getLogin)
        .get('/user', authMiddleware, userControllerInstance.getLoggedUser) 
        .get('/user/:id', authMiddleware, userControllerInstance.getLoggedUser) 
        .post('/signup', userControllerInstance.postSignup) 
        .post('/logout', authMiddleware, userControllerInstance.logoutUser)
     
    return router;
}