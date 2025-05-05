const { getUserModel } = require('../../../../models/user/userModel');
const { logger } = require('../../../../helpers/logger');
const AppError = require('../../../../middlewares/errorhandler/appError');

const User = getUserModel();

const createProfileDao = async (userId, profileData) => {
  try {
    const { skills, ...otherProfileData } = profileData;

    const update = {
      $push: { profile: otherProfileData },
    };
    if (skills && skills.length > 0) {
      update.$push.skills = { $each: skills };
    }

    const profile = await User.findByIdAndUpdate(
      userId,
      update,
      { new: true, runValidators: true }
    ).select('profile skills');
    if (!profile) {
      throw new AppError('User not found', 404);
    }

    const newProfile = profile.profile[profile.profile.length - 1];
    newProfile.skills = profile.skills;
    return newProfile;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    logger.error('Error creating profile in DAO', { error: error.message });
    throw new AppError('Failed to create profile due to database error', 500);
  }
};

module.exports = { createProfileDao };