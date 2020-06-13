const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hobbyScheme = new Schema({
  name: { type: String, required: true, unique: true, trim: true, minlength: 3 },
},
  { timestamps: true }
);

const Hobby = mongoose.model('Hobby', hobbyScheme);

module.exports = Hobby;