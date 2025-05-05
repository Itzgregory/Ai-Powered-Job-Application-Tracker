const { createCultureDao } = require('../../../dal/dao/user/userProfile/culture');
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

    // Check if user already has culture preferences
    if (user.culture && user.culture.length > 0) {
      throw new AppError('User already has culture preferences', 409);
    }

    const culture = await createCultureDao(userId, cultureData);
    logger.info('Culture preferences created successfully', { userId });
    
    return {
      success: true,
      data: culture,
    };
  } catch (error) {
    logger.error('Error in culture service', { error: error.message });
    throw error;
  }
};

module.exports = { createCultureService };