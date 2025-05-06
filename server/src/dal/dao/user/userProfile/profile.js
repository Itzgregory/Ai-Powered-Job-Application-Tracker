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


const getProfileDao = async (id) => {
  try {

    const user = await User.findById(id).select('profile skills firstName lastName');
    
    if (!user) {
      logger.error('User not found', { id });
      throw new AppError('User not found', 404);
    }

    if (!user.profile || user.profile.length === 0) {
      logger.info('No profile found for user, returning empty array', { id });
      return [];
    }

    const latestProfile = user.profile[user.profile.length - 1];

    const response = {
      // spread and convert mongoose document to plain object
      ...latestProfile.toObject(), 
      skills: user.skills.toObject() || [], 
      firstName: user.firstName || '', 
      lastName: user.lastName || '' 
    };

    return response;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    logger.error('Error fetching profile in DAO', {
      error: error.message,
      stack: error.stack,
      userId
    });
    throw new AppError('Failed to fetch profile due to database error', 500);
  }
};

module.exports = { createProfileDao, getProfileDao };