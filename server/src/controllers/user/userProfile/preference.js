const { createPreferenceService } = require('../../../service/user/userProfile/preference');
const { preferenceValidation, formatErrorResponse } = require('../../../helpers/validation/userValidation/preferenceValidation');
const { logger } = require('../../../helpers/logger');


const getPreferenceMappingsController = async (req, res, next) => {
  try {
    const mappings = preferenceValidation.getPreferenceMappings();
    logger.info('Retrieved preference mappings');
    res.status(200).json({
      success: true,
      message: 'Retrieved Preference Mapping Successfully',
      data: mappings
    });
  } catch (error) {
    logger.error('Error retrieving preference mappings', { error: error.message });
    next(error);
  }
};

const createPreferenceController = async (req, res, next) => {
  try {
    const { error } = preferenceValidation.createPreferenceSchema().validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const formattedError = formatErrorResponse(error, error);
      logger.error(`Preference validation error: ${formattedError.message}`);
      return res.status(400).json(formattedError);
    }

    logger.info('Creating new preference', { userId: req.user.id });
    const response = await createPreferenceService(req.user.id, req.body);
    res.status(201).json({
      success: true,
      message: 'Preference successfully created',
      data: response.data,
    });
  } catch (error) {
    logger.error('Error creating preference', { error: error.message });
    next(error);
  }
};

module.exports = { getPreferenceMappingsController, createPreferenceController };