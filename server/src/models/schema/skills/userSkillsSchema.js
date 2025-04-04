const mongoose = require('mongoose');

const userSkillSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  proficiencyLevel: {
    type: String, 
        enum: ['Beginner', 'Intermediate', 'Advanced'], 
        default: 'Beginner' ,
  }
},{ timestamps: true });

module.exports = {userSkillSchema};