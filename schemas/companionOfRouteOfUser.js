const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CompanionRouteSchema = new Schema({
  routeId: String,
  companionId: String,
  userId: String,
  isAgreeToTravel: Boolean
});

const CompanionRoute = mongoose.model("companionRoute", CompanionRouteSchema);
module.exports = CompanionRoute;
