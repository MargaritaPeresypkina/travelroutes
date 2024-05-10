const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CompanionSchema = new Schema({
  name: String,
  description: String,
  avatarImage: String,
  login: String,
});

const Companion = mongoose.model("companion", CompanionSchema);
module.exports = Companion;