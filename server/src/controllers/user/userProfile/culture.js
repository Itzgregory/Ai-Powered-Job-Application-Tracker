const { createCultureService, getCultureService } = require('../../../service/user/userProfile/culture');
const { cultureValidation, formatErrorResponse } = require('../../../helpers/validation/userValidation/cultureValidation');
const { logger, logwarn, logerror } = require('../../../helpers/logger');
const validateMongoDbId = require("../../../helpers/validation/validateMongoDbId/validateMongoDbid");


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
      logerror.error(`Culture validation error: ${formattedError.message}`);
      return res.status(400).json(formattedError);
    }

    logger.info('Creating new culture', { userId: req.user.id });
    
    const response = await createCultureService(req.user.id, req.body);
    res.status(201).json({
      success: true,
      message: 'culture successfully created',
      data: response.data,
    });
  } catch (error) {
    logger.error('Error creating culture', { error: error.message });
    next(error);
  }
};


const getCultureController = async (req, res, next) => {
  try {
    if (!req.user?.id) {
      logger.error('No user ID found in token', { headers: req.headers });
      throw new AppError('Unauthorized: No user ID in token', 401);
    }

    const id = req.user.id;

    validateMongoDbId(id);

    logger.info('Fetching culture for user', { userId: id });
    const response = await getCultureService(id);
    
    res.status(200).json({
      success: response.success,
      message: response.message,
      data: response.data
    });
  } catch (error) {
    logger.error('Error fetching culture in controller', {
      error: error.message,
      stack: error.stack,
      userId: req.user?.id,
      errorName: error.name
    });
    next(error);
  }
};


module.exports = { getCultureMappingsController, createCultureController, getCultureController };