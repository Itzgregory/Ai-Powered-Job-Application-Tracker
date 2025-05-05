const { createPreferenceDao } = require('../../../dal/dao/user/userProfile/preference');
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

module.exports = { createPreferenceService };