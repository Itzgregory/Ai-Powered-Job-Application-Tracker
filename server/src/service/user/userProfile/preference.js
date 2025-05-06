const { createPreferenceDao, getpreferenceDao } = require('../../../dal/dao/user/userProfile/preference');
const { getUserModel } = require('../../../models/user/userModel');
const { logger } = require('../../../helpers/logger');
const AppError = require('../../../middlewares/errorhandler/appError');

const createPreferenceService = async (userId, preferenceData) => {
  try {
    const User = getUserModel();
    const user = await User.findById(userId).lean();
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.preferences && user.preferences.length > 0) {
      throw new AppError('User already has a preference', 409);
    }

    const preference = await createPreferenceDao(userId, preferenceData);
    logger.info('Preference created successfully', { userId });
    return {
      success: true,
      data: preference,
    };
  } catch (error) {
    logger.error('Error in preference service', { error: error.message });
    throw error;
  }
};

const getPreferenceService = async (id) => {
  try {
    const preference = await getpreferenceDao(id);

    if (Array.isArray(preference) && preference.length === 0) {
      logger.info('Empty preference returned for user', { id });
      return {
        success: false,
        data: [],
        message: 'No preference found'
      };
    }

    logger.info('preference retrieved successfully', { id });
    return {
      success: true,
      data: preference,
      message: 'preference retrieved successfully'
    };
  } catch (error) {
    logger.error('Error in preference service', {
      error: error.message,
      stack: error.stack,
      userId
    });
    throw error;
  }
};

module.exports = { createPreferenceService, getPreferenceService };