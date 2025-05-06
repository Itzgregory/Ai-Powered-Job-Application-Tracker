const mongoose = require('mongoose');
const { getUserModel } = require('../../../../models/user/userModel');
const { logger } = require('../../../../helpers/logger');
const AppError = require('../../../../middlewares/errorhandler/appError');

const User = getUserModel();

const createPreferenceDao = async (userId, preferenceData) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      logger.error('Invalid userId format', { userId });
      throw new AppError('Invalid user ID format', 400);
    }

    logger.info('Preference data to be saved', { userId, preferenceData });

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { preferences: preferenceData } },
      { new: true, runValidators: true }
    ).select('preferences');

    if (!user) {
      logger.error('User not found', { userId });
      throw new AppError('User not found', 404);
    }

    return user.preferences[user.preferences.length - 1];
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    logger.error('Error creating preference in DAO', {
      error: error.message,
      stack: error.stack,
      userId,
      preferenceData
    });
    throw new AppError('Failed to create preference due to database error', 500);
  }
};

const getpreferenceDao = async (id) => {
  try {

    const user = await User.findById(id).select('preferences');
    
    if (!user) {
      logger.error('User not found', { id });
      throw new AppError('User not found', 404);
    }

    if (!user.preferences || user.preferences.length === 0) {
      logger.info('No preference found for user, returning empty array', { id });
      return [];
    }

    const latestpreference = user.preferences[user.preferences.length - 1];

    const response = {
      // spread and convert mongoose document to plain object
      ...latestpreference.toObject() || [],
    };

    return response;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    logger.error('Error fetching preference in DAO', {
      error: error.message,
      stack: error.stack,
      userId
    });
    throw new AppError('Failed to fetch preference due to database error', 500);
  }
};


module.exports = { createPreferenceDao, getpreferenceDao };