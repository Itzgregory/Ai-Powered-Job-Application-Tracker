const Joi = require('joi');

const formatValidationResponse = (error) => ({
  success: false,
  message: error.details.map(err => err.message).join(', '),
  data: null
});

const profileValidation = {
  createProfileSchema: () => Joi.object({
    avatar: Joi.array().items(
      Joi.object({
        url: Joi.string().required(),
        id: Joi.string().required(),
      })
    ).optional(),
    location: Joi.string().optional(),
    primaryRole: Joi.string().optional(),
    yearsExperience: Joi.string().optional(),
    roles: Joi.array().items(Joi.string()).optional(),
    skills: Joi.array().items(
        Joi.object({
        name: Joi.string().required(),
        proficiencyLevel: Joi.string().required(),
        })
    ).optional(),
    bio: Joi.string().max(500).optional(),
    website: Joi.string().uri().optional(),
    linkedin: Joi.string().uri().optional(),
    github: Joi.string().uri().optional(),
    twitter: Joi.string().uri().optional(),
    workExperience: Joi.array().items(
      Joi.object({
        company: Joi.string().required(),
        role: Joi.string().required(),
        startDate: Joi.string().required(),
        endDate: Joi.string().optional(),
      })
    ).optional(),
    education: Joi.array().items(
      Joi.object({
        school: Joi.string().required(),
        degree: Joi.string().required(),
        year: Joi.string().required(),
      })
    ).optional(),
    achievements: Joi.string().optional(),
    pronouns: Joi.string().optional(),
    gender: Joi.string().optional(),
    raceEthnicity: Joi.array().items(Joi.string()).optional(),
  }).unknown(false),
};

module.exports = { profileValidation, formatValidationResponse };