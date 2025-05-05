const mongoose = require('mongoose');
const { userSkillSchema } = require("../schema/skills/userSkillsSchema");
const {userProfileSchema} = require("../schema/profile/userProfilechema");
const {userProfilePrefrenceSchema} = require("../schema/profile/userPreferenceSchema");
const {userProfileCultureSchema} = require("../schema/profile/userCultureSchema");

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, lowercase: true },
    lastName: { type: String, required: true, lowercase: true },
    otherName: { type: String, lowercase: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    password: { type: String, required: true },
    accountStatus: { type: String, enum: ['ACTIVE', 'SUSPENDED', 'DEACTIVATED'], default: 'ACTIVE' },
    tokens: [{ type: String }],
    lastLogin: { type: Date },
    termsAccepted: { type: Boolean, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    profile: [userProfileSchema],
    skills: [userSkillSchema],
    preferences: [userProfilePrefrenceSchema],
    culture: [userProfileCultureSchema],
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }]
}, { timestamps: true });

let User;

const getUserModel = () => {
    if (!User) {
        User = mongoose.model('User', UserSchema);
    }
    return User;
};

module.exports = { getUserModel };  
