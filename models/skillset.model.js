const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillsetScheme = new Schema({
  name: { type: String, required: true, unique: true }
},
  { timestamps: true }
);

const SkillSet = mongoose.model('SkillSet', skillsetScheme);

module.exports = SkillSet;