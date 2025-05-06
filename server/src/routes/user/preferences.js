const express = require('express');
const { authMiddleware } = require('../../middlewares/authentication/authMiddleware');
const {getPreferenceMappingsController, createPreferenceController, getPreferenceController} = require('../../controllers/user/userProfile/preference');

const router = express.Router();


module.exports = routerUsersPrefrences = () => {
    router         
        .get('/preference/preference-mappings', getPreferenceMappingsController)
        .post('/preference',  authMiddleware, createPreferenceController)
        .get('/preference/user',  authMiddleware, getPreferenceController)
     
    return router;
}