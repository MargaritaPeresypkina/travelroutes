import { configureStore } from "@reduxjs/toolkit";
import routes from "./routes";
import companions from "./companions";
import companionsOfRouteSlice from "./companionsOfRouteSlice";
import userSlice from "./userSlice";
import userroutes from "./userroutes";

const store = configureStore({
  reducer: {
    routes,
    companions,
    companionsOfRouteSlice,
    userSlice,
    userroutes,
  },
});

export default store;
