const Joi = require('joi');

const cultureMappings = {
  motivation: {
    SP: 'Solving technical problems',
    BP: 'Building products'
  },
  careerTrack: {
    IC: 'Individual contributor',
    MG: 'Manager'
  },
  preferredEnvironment: {
    ST: 'Clear role and set of responsibilities. Consistent feedback from management.',
    FL: 'Employees wear a lot of hats. Assignments often require employees to "figure it out" on their own.'
  },
  jobImportance: {
    AU: 'Having a say in what I work on and how I work',
    PR: 'Opportunities to progress within the company',
    TL: 'Team members I can learn from',
    GR: 'A company with a good growth trajectory',
    SD: "Having a say in the company's and/or my team's direction",
    ME: 'Mentorship opportunities',
    LE: 'Learn new things and develop my skills',
    CH: 'Challenging problems to work on',
    DT: 'A diverse team'
  },
  importanceLevel: {
    VI: 'Very important',
    IM: 'Important',
    NI: 'Not important'
  }
};

const formatErrorResponse = (error) => ({
  success: false,
  message: error.details.map(err => err.message).join(', '),
  data: null
});

const cultureValidation = {
  createCultureSchema: () => Joi.object({
    jobCriteriaDescription: Joi.string()
      .max(300)
      .trim()
      .required()
      .messages({
        'string.max': 'Job criteria description cannot exceed 300 characters',
        'string.base': 'Job criteria description must be a string'
      }),

    motivation: Joi.string()
      .valid('SP', 'BP')
      .required()
      .messages({
        'any.only': 'Motivation must be one of: SP (Solving technical problems), BP (Building products)',
        'string.base': 'Motivation must be a string'
      }),

    careerTrack: Joi.string()
      .valid('IC', 'MG')
      .required()
      .messages({
        'any.only': 'Career track must be one of: IC (Individual contributor), MG (Manager)',
        'string.base': 'Career track must be a string'
      }),

    preferredEnvironment: Joi.string()
      .valid('ST', 'FL')
      .required()
      .messages({
        'any.only': 'Preferred environment must be one of: ST (Structured), FL (Flexible)',
        'string.base': 'Preferred environment must be a string'
      }),

    jobImportance: Joi.array()
      .items(
        Joi.string()
          .valid('AU', 'PR', 'TL', 'GR', 'SD', 'ME', 'LE', 'CH', 'DT')
          .messages({
            'any.only': 'Each job importance item must be a valid code (AU, PR, TL, GR, SD, ME, LE, CH, DT)'
          })
      )
      .max(2)
      .required()
      .messages({
        'array.base': 'Job importance must be an array',
        'array.max': 'Job importance cannot have more than 2 items'
      }),

    remoteWorkImportance: Joi.string()
      .valid('VI', 'IM', 'NI')
      .required()
      .messages({
        'any.only': 'Remote work importance must be one of: VI (Very important), IM (Important), NI (Not important)',
        'string.base': 'Remote work importance must be a string'
      }),

    quietOfficeImportance: Joi.string()
      .valid('VI', 'IM', 'NI')
      .required()
      .messages({
        'any.only': 'Quiet office importance must be one of: VI (Very important), IM (Important), NI (Not important)',
        'string.base': 'Quiet office importance must be a string'
      }),

    interestedMarkets: Joi.array()
      .items(Joi.string())
      .default([])
      .required()
      .messages({
        'array.base': 'Interested markets must be an array',
        'string.base': 'Each interested market must be a string'
      }),

    restrictedMarkets: Joi.array()
      .items(Joi.string())
      .default([])
      .required()
      .messages({
        'array.base': 'Restricted markets must be an array',
        'string.base': 'Each restricted market must be a string'
      }),
  }).unknown(false),

  
  transformCultureValues: (cultureData) => {
    const transformed = { ...cultureData };

    if (transformed.motivation && cultureMappings.motivation[transformed.motivation]) {
      transformed.motivation = cultureMappings.motivation[transformed.motivation];
    }

    if (transformed.careerTrack && cultureMappings.careerTrack[transformed.careerTrack]) {
      transformed.careerTrack = cultureMappings.careerTrack[transformed.careerTrack];
    }

    if (transformed.preferredEnvironment && cultureMappings.preferredEnvironment[transformed.preferredEnvironment]) {
      transformed.preferredEnvironment = cultureMappings.preferredEnvironment[transformed.preferredEnvironment];
    }

    if (transformed.remoteWorkImportance && cultureMappings.importanceLevel[transformed.remoteWorkImportance]) {
      transformed.remoteWorkImportance = cultureMappings.importanceLevel[transformed.remoteWorkImportance];
    }

    if (transformed.quietOfficeImportance && cultureMappings.importanceLevel[transformed.quietOfficeImportance]) {
      transformed.quietOfficeImportance = cultureMappings.importanceLevel[transformed.quietOfficeImportance];
    }

    if (transformed.jobImportance && Array.isArray(transformed.jobImportance)) {
      transformed.jobImportance = transformed.jobImportance.map(code => 
        cultureMappings.jobImportance[code] || code
      );
    }

    return transformed;
  },

  // Expose mappings for client-side or documentation
  getCultureMappings: () => cultureMappings
};

module.exports = { cultureValidation, formatErrorResponse };