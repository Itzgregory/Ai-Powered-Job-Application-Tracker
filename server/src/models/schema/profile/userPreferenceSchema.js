const mongoose = require('mongoose');

const userProfilePrefrenceSchema = new mongoose.Schema({
  jobSearchStatus: {
    type: String,
    enum: ['RI', 'OO', 'NL'], 
    required: true
  },

  requiresVisaSponsorship: {
    type: Boolean,
    required: true
  },
  authorizedToWorkInUS: {
    type: Boolean,
    required: true
  },

  primaryJobType: {
    type: String,
    enum: ['FT', 'CT', 'IN', 'CF'], 
    required: true
  },
  openToJobTypes: [{
    type: String,
    enum: ['FT', 'CT', 'IN', 'CF'] 
  }],

  preferredLocations: [{
    type: String
  }],
  openToRemote: {
    type: Boolean,
    default: false
  },
  remotePreference: {
    type: String,
    enum: ['OS', 'RO', 'OR', 'HY'], 
    default: 'OR'
  },

  salaryCurrency: {
    type: String,
    default: 'USD'
  },
  desiredSalary: {
    type: Number
  },

  companySizePreferences: [{
    sizeRange: {
      type: String,
      enum: ['S1', 'E1', 'M2', 'L5', 'V1', 'M1'] 
    },
    preferenceLevel: {
      type: String,
      enum: ['ID', 'YS', 'NO'],
      default: 'YS'
    }
  }],

}, { timestamps: true });

module.exports = { userProfilePrefrenceSchema };