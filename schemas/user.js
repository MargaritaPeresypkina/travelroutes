const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  description: String,
  password: String,
  login: String,
  email: String,
  avatarImage: String,
  isAgreeToTravel: Boolean
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
