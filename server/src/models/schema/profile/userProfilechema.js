const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  avatar: [
    {
      url: { type: String, required: true },
      id: { type: String, required: true }
    }
  ],
  location: {
    type: String,
  },
  primaryRole: {
    type: String
  },
  yearsExperience: {
    type: String
  },
  roles: [
    {
      type: String
    }
  ],
  bio: {
    type: String
  },
  website: {
    type: String
  },
  linkedin: {
    type: String
  },
  github: {
    type: String
  },
  twitter: {
    type: String
  },
  workExperience: [
    {
      company: { type: String },
      role: { type: String },
      startDate: { type: String },
      endDate: { type: String }
    }
  ],
  education: [
    {
      school: { type: String },
      degree: { type: String },
      year: { type: String }
    }
  ],
  achievements: {
    type: String
  },
  pronouns: {
    type: String
  },
  gender: {
    type: String
  },
  raceEthnicity: [
    {
      type: String
    }
  ]
}, { timestamps: true });

module.exports = { userProfileSchema };