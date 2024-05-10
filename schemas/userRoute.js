const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserRouteSchema = new Schema({
  routeId: String,
  isUserRoute: Boolean,
  userId: String
});

const UserRoute = mongoose.model("userRoute", UserRouteSchema);
module.exports = UserRoute;
