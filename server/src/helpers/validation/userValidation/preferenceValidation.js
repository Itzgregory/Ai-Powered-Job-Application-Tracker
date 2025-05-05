const Joi = require('joi');

const preferenceMappings = {
  jobSearchStatus: {
    RI: 'Ready to interview',
    OO: 'Open to offers',
    NL: 'Not looking'
  },
  jobType: {
    FT: 'Full-time',
    CT: 'Contract',
    IN: 'Internship',
    CF: 'Co-founder'
  },
  remotePreference: {
    OS: 'Onsite only',
    RO: 'Remote only',
    OR: 'Onsite or remote',
    HY: 'Hybrid'
  },
  companySize: {
    S1: 'Seed (1-10 employees)',
    E1: 'Early (11-50 employees)',
    M2: 'Mid-size (51-200 employees)',
    L5: 'Large (201-500 employees)',
    V1: 'Very Large (501-1000 employees)',
    M1: 'Massive (1001+ employees)'
  },
  preferenceLevel: {
    ID: 'Ideal',
    YS: 'Yes',
    NO: 'No'
  }
};

const formatErrorResponse = (error) => ({
  success: false,
  message: error.details.map(err => err.message).join(', '),
  data: null
});


const preferenceValidation = {
  createPreferenceSchema: () => Joi.object({
    jobSearchStatus: Joi.string()
      .valid('RI', 'OO', 'NL')
      .required()
      .messages({
        'any.only': 'jobSearchStatus must be one of: RI (Ready to interview), OO (Open to offers), NL (Not looking)',
        'any.required': 'jobSearchStatus is required'
      }),

    requiresVisaSponsorship: Joi.boolean()
      .required()
      .messages({
        'boolean.base': 'requiresVisaSponsorship must be a boolean',
        'any.required': 'requiresVisaSponsorship is required'
      }),

    authorizedToWorkInUS: Joi.boolean()
      .required()
      .messages({
        'boolean.base': 'authorizedToWorkInUS must be a boolean',
        'any.required': 'authorizedToWorkInUS is required'
      }),

    primaryJobType: Joi.string()
      .valid('FT', 'CT', 'IN', 'CF')
      .required()
      .messages({
        'any.only': 'primaryJobType must be one of: FT (Full-time), CT (Contract), IN (Internship), CF (Co-founder)',
        'any.required': 'primaryJobType is required'
      }),
    openToJobTypes: Joi.array()
      .items(
        Joi.string().valid('FT', 'CT', 'IN', 'CF')
          .messages({
            'any.only': 'Each openToJobTypes item must be one of: FT (Full-time), CT (Contract), IN (Internship), CF (Co-founder)'
          })
      )
      .optional()
      .messages({
        'array.base': 'openToJobTypes must be an array'
      }),

    preferredLocations: Joi.array()
      .items(Joi.string())
      .optional()
      .messages({
        'array.base': 'preferredLocations must be an array',
        'string.base': 'Each preferredLocations item must be a string'
      }),

    openToRemote: Joi.boolean()
      .default(false)
      .optional()
      .messages({
        'boolean.base': 'openToRemote must be a boolean'
      }),

    remotePreference: Joi.string()
      .valid('OS', 'RO', 'OR', 'HY')
      .default('OR')
      .optional()
      .messages({
        'any.only': 'remotePreference must be one of: OS (Onsite only), RO (Remote only), OR (Onsite or remote), HY (Hybrid)'
      }),

    salaryCurrency: Joi.string()
      .default('USD')
      .optional()
      .messages({
        'string.base': 'salaryCurrency must be a string'
      }),

    desiredSalary: Joi.number()
      .optional()
      .messages({
        'number.base': 'desiredSalary must be a number'
      }),

    companySizePreferences: Joi.array()
      .items(
        Joi.object({
          sizeRange: Joi.string()
            .valid('S1', 'E1', 'M2', 'L5', 'V1', 'M1')
            .required()
            .messages({
              'any.only': 'companySizePreferences.sizeRange must be one of: S1 (Seed 1-10), E1 (Early 11-50), M2 (Mid-size 51-200), L5 (Large 201-500), V1 (Very Large 501-1000), M1 (Massive 1001+)',
              'any.required': 'companySizePreferences.sizeRange is required'
            }),

          preferenceLevel: Joi.string()
            .valid('ID', 'YS', 'NO')
            .default('YS')
            .optional()
            .messages({
              'any.only': 'companySizePreferences.preferenceLevel must be one of: ID (Ideal), YS (Yes), NO (No)'
            })
        })
      )
      .optional()
      .messages({
        'array.base': 'companySizePreferences must be an array'
      }),

  }).unknown(false),

  transformPreferenceValues: (preferenceData) => {
    const transformed = { ...preferenceData };

    if (transformed.jobSearchStatus && preferenceMappings.jobSearchStatus[transformed.jobSearchStatus]) {
      transformed.jobSearchStatus = preferenceMappings.jobSearchStatus[transformed.jobSearchStatus];
    }

    if (transformed.primaryJobType && preferenceMappings.jobType[transformed.primaryJobType]) {
      transformed.primaryJobType = preferenceMappings.jobType[transformed.primaryJobType];
    }

    if (transformed.openToJobTypes && Array.isArray(transformed.openToJobTypes)) {
      transformed.openToJobTypes = transformed.openToJobTypes.map(code => 
        preferenceMappings.jobType[code] || code
      );
    }

    if (transformed.remotePreference && preferenceMappings.remotePreference[transformed.remotePreference]) {
      transformed.remotePreference = preferenceMappings.remotePreference[transformed.remotePreference];
    }

    if (transformed.companySizePreferences && Array.isArray(transformed.companySizePreferences)) {
      transformed.companySizePreferences = transformed.companySizePreferences.map(preference => {
        const transformedPreference = { ...preference };
        
        if (transformedPreference.sizeRange && preferenceMappings.companySize[transformedPreference.sizeRange]) {
          transformedPreference.sizeRange = preferenceMappings.companySize[transformedPreference.sizeRange];
        }
        
        if (transformedPreference.preferenceLevel && preferenceMappings.preferenceLevel[transformedPreference.preferenceLevel]) {
          transformedPreference.preferenceLevel = preferenceMappings.preferenceLevel[transformedPreference.preferenceLevel];
        }
        
        return transformedPreference;
      });
    }

    return transformed;
  },
  // Expose mappings for client-side or documentation
  getPreferenceMappings: () => preferenceMappings
};

module.exports = { preferenceValidation, formatErrorResponse };