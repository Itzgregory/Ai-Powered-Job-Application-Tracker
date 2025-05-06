const { createCultureDao, getCultureDao } = require('../../../dal/dao/user/userProfile/culture');
const { getUserModel } = require('../../../models/user/userModel');
const { logger } = require('../../../helpers/logger');
const AppError = require('../../../middlewares/errorhandler/appError');

const createCultureService = async (userId, cultureData) => {
  try {
    const User = getUserModel();
    const user = await User.findById(userId).lean();
    
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Check if user already has culture cultures
    if (user.culture && user.culture.length > 0) {
      throw new AppError('User already has culture cultures', 409);
    }

    const culture = await createCultureDao(userId, cultureData);
    logger.info('Culture cultures created successfully', { userId });
    
    return {
      success: true,
      data: culture,
    };
  } catch (error) {
    logger.error('Error in culture service', { error: error.message });
    throw error;
  }
};

const getCultureService = async (id) => {
  try {
    const culture = await getCultureDao(id);

    if (Array.isArray(culture) && culture.length === 0) {
      logger.info('Empty culture returned for user', { id });
      return {
        success: false,
        data: [],
        message: 'No culture found'
      };
    }

    logger.info('culture retrieved successfully', { id });
    return {
      success: true,
      data: culture,
      message: 'culture retrieved successfully'
    };
  } catch (error) {
    logger.error('Error in culture service', {
      error: error.message,
      stack: error.stack,
      userId
    });
    throw error;
  }
};

module.exports = { createCultureService, getCultureService };