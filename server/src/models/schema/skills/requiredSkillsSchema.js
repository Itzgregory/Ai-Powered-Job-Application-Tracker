const mongoose = require("mongoose");

const requiredSkillsSchema = new mongoose.Schema({
    skillName: { type: String, required: true },
    experienceLevel: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true }
});

module.exports = requiredSkillsSchema; 
