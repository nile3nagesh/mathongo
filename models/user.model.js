const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  otp: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
