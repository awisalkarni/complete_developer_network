const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillsetScheme = new Schema({
  name: { type: String, required: true, unique: true, trim: true, minlength: 3 },
  proficiency: { type: String },
  
},
  { timestamps: true }
);

const SkillSet = mongoose.model('SkillSet', skillsetScheme);

module.exports = SkillSet;