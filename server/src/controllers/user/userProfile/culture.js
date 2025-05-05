const { createCultureService } = require('../../../service/user/userProfile/culture');
const { cultureValidation, formatErrorResponse } = require('../../../helpers/validation/userValidation/cultureValidation');
const { logger } = require('../../../helpers/logger');

const getCultureMappingsController = async (req, res, next) => {
  try {
    const mappings = cultureValidation.getCultureMappings();
    logger.info('Retrieved culture mappings');
    res.status(200).json({
      success: true,
      message: 'Retrieved Culture Mapping Successfully',
      data: mappings
    });
  } catch (error) {
    logger.error('Error retrieving culture mappings', { error: error.message });
    next(error);
  }
};

const createCultureController = async (req, res, next) => {
  try {
    const { error } = cultureValidation.createCultureSchema().validate(req.body, {
      abortEarly: false,
    });
    
    if (error) {
      const formattedError = formatErrorResponse(error);
      logger.error(`Culture validation error: ${formattedError.message}`);
      return res.status(400).json(formattedError);
    }

    logger.info('Creating new culture preferences', { userId: req.user.id });
    
    const response = await createCultureService(req.user.id, req.body);
    res.status(201).json({
      success: true,
      message: 'Culture preferences successfully created',
      data: response.data,
    });
  } catch (error) {
    logger.error('Error creating culture preferences', { error: error.message });
    next(error);
  }
};

module.exports = { getCultureMappingsController, createCultureController };