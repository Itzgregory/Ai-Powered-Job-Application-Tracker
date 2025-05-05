const mongoose = require('mongoose');

const userProfileCultureSchema = new mongoose.Schema({
  jobCriteriaDescription: {
    type: String,
    maxlength: 300,
    trim: true,
  },
  motivation: {
    type: String,
    enum: ['SP', 'BP'],
  },
  careerTrack: {
    type: String,
    enum: ['IC', 'MG'],
  },
  preferredEnvironment: {
    type: String,
    enum: [
      'ST',
      'FL'
    ],
  },
  jobImportance: {
    type: [String],
    enum: [
      'AU',
      'PR',
      'TL',
      'GR',
      'SD',
      'ME',
      'LE',
      'CH',
      'DT'
    ],
    validate: [arr => arr.length <= 2, '{PATH} exceeds the limit of 2'],
  },
  remoteWorkImportance: {
    type: String,
    enum: ['VI', 'IM', 'NI'],
  },
  quietOfficeImportance: {
    type: String,
    enum: ['VI', 'IM', 'NI'],
  },
  interestedMarkets: {
    type: [String], 
    default: [],
  },
  restrictedMarkets: {
    type: [String], 
    default: [],
  },
}, { _id: false }); 

module.exports = {userProfileCultureSchema};
