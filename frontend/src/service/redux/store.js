import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import orderReducer from "./orderSlice";
export default configureStore({
  reducer: {
    login: loginReducer,
    order: orderReducer,
  },
});
