const { createProfileDao } = require('../../../dal/dao/user/userProfile/profile');
const { getUserModel } = require('../../../models/user/userModel');
const { logger } = require('../../../helpers/logger');
const AppError = require('../../../middlewares/errorhandler/appError');

const createProfileService = async (userId, profileData) => {
  try {

    const User = getUserModel();
    const user = await User.findById(userId).lean();
    if (!user) {
      throw new AppError('User not found', 404);
    }

   if (user.profile && user.profile.length > 0) {
      throw new AppError('User already has a profile', 409);
    }

    const profile = await createProfileDao(userId, profileData);
    logger.info('Profile created successfully', { userId });
    return {
      success: true,
      data: profile,
    };
  } catch (error) {
    logger.error('Error in profile service', { error: error.message });
    throw error;
  }
};

module.exports = { createProfileService };