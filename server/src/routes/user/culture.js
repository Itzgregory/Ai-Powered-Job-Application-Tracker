const express = require('express');
const { authMiddleware } = require('../../middlewares/authentication/authMiddleware');
const {getCultureMappingsController, createCultureController} = require('../../controllers/user/userProfile/culture');

const router = express.Router();


module.exports = routerUsersCulture = () => {
    router         
        .get('/culture/culture-mappings', getCultureMappingsController)
        .post('/culture',  authMiddleware, createCultureController)
     
    return router;
}