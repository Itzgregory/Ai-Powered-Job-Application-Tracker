const mongoose = require('mongoose');
const requiredSkillsSchema = require('../schema/skills/requiredSkillsSchema'); 


const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salaryRange: { type: String, required: true },
    requiredSkills: [requiredSkillsSchema], 
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
}, { timestamps: true });
  
const getJobModel = mongoose.model('job', jobSchema);
module.exports = getJobModel;
