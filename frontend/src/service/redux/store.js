import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import orderReducer from "./orderSlice";
import servicesReducer from "./serviceSlice"
export default configureStore({
  reducer: {
    login: loginReducer,
    order: orderReducer,
    services: servicesReducer,
  },
});
