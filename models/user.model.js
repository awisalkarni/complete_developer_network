const mongoose = require('mongoose');
const Schema = mongoose.Schema;
bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  phone_number: { type: String },
  skillsets: [
    {
      type: Schema.Types.ObjectId,
      ref: "SkillSet",
      unique: true
    }
  ],
  hobbies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Hobby"
    }
  ]
},
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;