const { createProfileService } = require('../../../service/user/userProfile/profile');
const { profileValidation } = require('../../../helpers/validation/userValidation/profileValidation');
const { logger } = require('../../../helpers/logger');
const handlePhotoUpload = require('../../../helpers/photoHandler/photohandler');


const createProfile = async (req, res, next) => {
    try {
      const uploadedAvatars = req.files ? await handlePhotoUpload(req.files) : [];
      if (!uploadedAvatars.length) {
        logger.info('No avatar uploaded for profile; proceeding with empty avatar array');
        req.body.avatar = [];
      } else {
        req.body.avatar = uploadedAvatars;
      }
  
      const { error } = profileValidation.createProfileSchema().validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const formattedError = formatErrorResponse(error);
        logger.error(`Profile validation error: ${formattedError.message}`);
        return res.status(400).json(formattedError);
      }
  
      logger.info('Creating new profile', { userId: req.user.id });
      const response = await createProfileService(req.user.id, req.body);
      res.status(201).json({
        success: true,
        data: response.data,
      });
    } catch (error) {
      logger.error('Error creating profile', { error: error.message });
      next(error);
    }
  };
  
  module.exports = { createProfile };