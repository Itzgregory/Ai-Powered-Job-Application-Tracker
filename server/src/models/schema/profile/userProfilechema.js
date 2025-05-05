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
    value: { type: String },
    label: { type: String }
  },
  yearsExperience: {
    value: { type: String },
    label: { type: String }
  },
  roles: [
    {
      value: { type: String },
      label: { type: String }
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
    value: { type: String },
    label: { type: String }
  },
  gender: {
    value: { type: String },
    label: { type: String }
  },
  raceEthnicity: [
    {
      type: String
    }
  ]
}, { timestamps: true });

module.exports = { userProfileSchema };