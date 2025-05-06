const mongoose = require('mongoose');
const { getUserModel } = require('../../../../models/user/userModel');
const { logger } = require('../../../../helpers/logger');
const AppError = require('../../../../middlewares/errorhandler/appError');

const User = getUserModel();

const createCultureDao = async (userId, cultureData) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      logger.error('Invalid userId format', { userId });
      throw new AppError('Invalid user ID format', 400);
    }

    logger.info('Culture data to be saved', { userId, cultureData });

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { culture: cultureData } },
      { new: true, runValidators: true }
    ).select('culture');

    if (!user) {
      logger.error('User not found', { userId });
      throw new AppError('User not found', 404);
    }

    return user.culture[user.culture.length - 1];
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    logger.error('Error creating culture culture in DAO', {
      error: error.message,
      stack: error.stack,
      userId,
      cultureData
    });
    throw new AppError('Failed to create culture culture due to database error', 500);
  }
};

const getCultureDao = async (id) => {
  try {

    const user = await User.findById(id).select('culture');
    
    if (!user) {
      logger.error('User not found', { id });
      throw new AppError('User not found', 404);
    }

    if (!user.culture || user.culture.length === 0) {
      logger.info('No culture found for user, returning empty array', { id });
      return [];
    }

    const latestculture = user.culture[user.culture.length - 1];

    const response = {
      // spread and convert mongoose document to plain object
      ...latestculture.toObject() || [],
    };

    return response;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    logger.error('Error fetching culture in DAO', {
      error: error.message,
      stack: error.stack,
      userId
    });
    throw new AppError('Failed to fetch culture due to database error', 500);
  }
};

module.exports = { createCultureDao, getCultureDao };