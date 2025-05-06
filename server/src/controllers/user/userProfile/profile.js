const { createProfileService, getProfileService } = require('../../../service/user/userProfile/profile');
const { profileValidation, formatValidationResponse } = require('../../../helpers/validation/userValidation/profileValidation');
const { logger } = require('../../../helpers/logger');
const handlePhotoUpload = require('../../../helpers/photoHandler/photohandler');
const validateMongoDbId = require("../../../helpers/validation/validateMongoDbId/validateMongoDbid");

const createProfileController = async (req, res, next) => {
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
        const formattedError = formatValidationResponse(error);
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

const getProfileController = async (req, res, next) => {
  try {
    if (!req.user?.id) {
      logger.error('No user ID found in token', { headers: req.headers });
      throw new AppError('Unauthorized: No user ID in token', 401);
    }

    const id = req.user.id;

    validateMongoDbId(id);

    logger.info('Fetching profile for user', { userId: id });
    const response = await getProfileService(id);
    
    res.status(200).json({
      success: response.success,
      message: response.message,
      data: response.data
    });
  } catch (error) {
    logger.error('Error fetching profile in controller', {
      error: error.message,
      stack: error.stack,
      userId: req.user?.id,
      errorName: error.name
    });
    next(error);
  }
};
  
  module.exports = { createProfileController, getProfileController };