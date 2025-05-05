const express = require('express');
const { authMiddleware } = require('../../middlewares/authentication/authMiddleware');
const {getPreferenceMappingsController, createPreferenceController} = require('../../controllers/user/userProfile/preference');

const router = express.Router();


module.exports = routerUsersPrefrences = () => {
    router         
        .get('/preference/preference-mappings', getPreferenceMappingsController)
        .post('/preference',  authMiddleware, createPreferenceController)
     
    return router;
}